const micromatch = require('micromatch')
const { loadConfig } = require('tsconfig-paths/lib/config-loader')
const { createMatchPath } = require('tsconfig-paths/lib/match-path-sync')
const path = require('node:path')
const { INDEX_FILE_NAME } = require('./const')

const DEFAULT_EXTENSIONS = ['.js', '.ts', '.jsx', '.tsx']

const isMatchedPattern = ({ absolutePath, pattern }) => {
  return micromatch.isMatch(absolutePath, pattern)
}

const getMatchedPattern = ({ absolutePath, patterns }) => {
  return patterns.find((pattern) => micromatch.isMatch(absolutePath, pattern))
}

const getAbsolutePath = ({ filePath, context, extensions }) => {
  if (isAliasPath({ filePath, extensions })) {
    return getAliasAbsolutePath({ filePath, extensions })
  }

  if (isRelativePath({ filePath })) {
    return getRelativeAbsolutePath({ filePath, context })
  }

  return path.normalize(filePath)
}

let matchPathCache = undefined

const isAliasPath = ({ filePath, extensions }) => {
  if (isRelativePath({ filePath })) {
    return false
  }

  const matchPath = matchPathCache || (matchPathCache = initMatchPath())

  return !!matchPath(filePath, undefined, undefined, extensions)
}

const initMatchPath = () => {
  const config = loadConfig()

  if (config.resultType === 'failed') {
    console.warn('Failed to load tsconfig:', config.message)
    return () => undefined
  }

  return createMatchPath(config.absoluteBaseUrl, config.paths)
}

const isRelativePath = ({ filePath }) => {
  return filePath.startsWith('./') || filePath.startsWith('../')
}

const getAliasAbsolutePath = ({ filePath, extensions }) => {
  const matchPath = matchPathCache || (matchPathCache = initMatchPath())
  return matchPath(filePath, undefined, undefined, extensions) || filePath
}

const getRelativeAbsolutePath = ({ filePath, context }) => {
  const currentDir = path.dirname(context.getPhysicalFilename())
  return path.resolve(currentDir, filePath)
}

const isDirectChild = ({ absolutePath, baseDirName }) => {
  const parentDir = path.dirname(absolutePath)
  const parentDirName = path.basename(parentDir)
  return parentDirName === baseDirName
}

const hasDirectoryInPath = ({ absolutePath, dirName }) => {
  return getSegments({ absolutePath }).includes(dirName)
}

const getSegments = ({ absolutePath }) => {
  return absolutePath.split(path.sep)
}

const isIndexFile = ({ absolutePath }) => {
  const filename = path.basename(absolutePath)
  return filename.startsWith(INDEX_FILE_NAME)
}

const isSameDirectory = ({ absolutePath1, absolutePath2 }) => {
  return path.dirname(absolutePath1) === path.dirname(absolutePath2)
}

const getRelativePathSegments = ({ targetPath, sourcePath }) => {
  return getSegments({ absolutePath: path.relative(sourcePath, targetPath) })
}

const isAbsolutePaths = ({ paths }) => {
  return paths.every((__path) => path.isAbsolute(__path))
}

/**
 * Normalizes import paths to their entry points.
 * - FolderName/FolderName.ts -> parent directory (public API)
 * - FolderName/FolderName.hooks.ts -> unchanged (internal implementation)
 * - index.ts -> unchanged (no longer treated as public API)
 */
const getEntryPath = (absolutePath, extensions = DEFAULT_EXTENSIONS) => {
  const basename = path.basename(absolutePath)
  const dirname = path.basename(path.dirname(absolutePath))

  let filename = basename
  for (const ext of extensions) {
    if (basename.endsWith(ext)) {
      filename = basename.slice(0, -ext.length)
      break
    }
  }

  if (filename === dirname) {
    return path.dirname(absolutePath)
  }

  return absolutePath
}

module.exports = {
  isMatchedPattern,
  getMatchedPattern,
  getAbsolutePath,
  isDirectChild,
  hasDirectoryInPath,
  isSameDirectory,
  getRelativePathSegments,
  isAbsolutePaths,
  getEntryPath,
}
