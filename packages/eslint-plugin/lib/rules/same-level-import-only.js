const path = require('node:path')
const {
  getAbsolutePath,
  getEntryPath,
  getMatchedPattern,
  getRelativePathSegments,
  hasDirectoryInPath,
  isAbsolutePaths,
  isDirectChild,
  isMatchedPattern,
  isSameDirectory,
} = require('../utils/path')

const DEFAULT_EXTENSIONS = ['.js', '.ts', '.jsx', '.tsx']
const SHARED_DIR_NAME = 'shared'

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'enforce same level imports',
      recommended: false,
    },
    schema: [
      {
        type: 'object',
        properties: {
          patterns: {
            type: 'array',
            items: { type: 'string' },
          },
        },
        additionalProperties: false,
      },
      {
        type: 'object',
        properties: {
          extensions: { type: 'array', items: { type: 'string' } },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      invalidImport: "Import path '{{importPath}}' is not in the same level.",
      invalidSharedImport:
        "Import path '{{importPath}}' is not a valid shared import.",
    },
  },
  create(context) {
    const options = context.options[0] ?? {}
    const patterns = options.patterns ?? []
    const extensions = options.extensions ?? DEFAULT_EXTENSIONS

    const isSharedImport = (absolutePath) =>
      hasDirectoryInPath({
        absolutePath,
        dirName: SHARED_DIR_NAME,
      })

    const isValidSharedImport = (absoluteFilePath, absoluteImportPath) => {
      if (
        !isDirectChild({
          absolutePath: absoluteImportPath,
          baseDirName: SHARED_DIR_NAME,
        })
      ) {
        return false
      }

      return isValidSharedImportLevel(absoluteFilePath, absoluteImportPath)
    }

    const isValidSharedImportLevel = (absoluteFilePath, absoluteImportPath) => {
      const segments = getRelativePathSegments({
        targetPath: path.dirname(absoluteImportPath),
        sourcePath: path.dirname(absoluteFilePath),
      })

      return (
        segments[segments.length - 1] === SHARED_DIR_NAME &&
        segments.every((part) => part === '..' || part === SHARED_DIR_NAME)
      )
    }

    const isValidRegularImport = (absoluteFilePath, absoluteImportPath) =>
      isSameDirectory({
        absolutePath1: absoluteFilePath,
        absolutePath2: absoluteImportPath,
      }) ||
      isSameDirectory({
        absolutePath1: getEntryPath(absoluteFilePath, extensions),
        absolutePath2: absoluteImportPath,
      })

    return {
      ImportDeclaration(node) {
        const importPath = node.source.value

        if (typeof importPath !== 'string') {
          return
        }

        const absoluteFilePath = getAbsolutePath({
          filePath: context.filename,
          context,
          extensions,
        })

        const matchedPattern = getMatchedPattern({
          absolutePath: absoluteFilePath,
          patterns,
        })

        if (!matchedPattern) {
          return
        }

        const absoluteImportPath = getAbsolutePath({
          filePath: importPath,
          context,
          extensions,
        })

        const importEntryPath = getEntryPath(absoluteImportPath, extensions)

        if (
          !isMatchedPattern({
            absolutePath: importEntryPath,
            pattern: matchedPattern,
          })
        ) {
          return
        }

        if (
          !isAbsolutePaths({
            paths: [absoluteFilePath, importEntryPath],
          })
        ) {
          return
        }

        if (
          isSharedImport(importEntryPath) &&
          !isSharedImport(absoluteFilePath)
        ) {
          if (!isValidSharedImport(absoluteFilePath, importEntryPath)) {
            context.report({
              node,
              messageId: 'invalidSharedImport',
              data: { importPath },
            })
          }

          return
        }

        if (!isValidRegularImport(absoluteFilePath, importEntryPath)) {
          context.report({
            node,
            messageId: 'invalidImport',
            data: { importPath },
          })
        }
      },
    }
  },
}
