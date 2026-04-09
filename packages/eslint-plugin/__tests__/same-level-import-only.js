const path = require('node:path')

// Mock tsconfig-paths BEFORE requiring rule (jest hoists these)
jest.mock('tsconfig-paths/lib/config-loader', () => ({
  loadConfig: () => ({
    resultType: 'success',
    absoluteBaseUrl: '/project/src',
    baseUrl: './src',
    configFileAbsolutePath: '/project/tsconfig.json',
    paths: {
      'Features/*': ['features/*'],
    },
  }),
}))

jest.mock('tsconfig-paths/lib/match-path-sync', () => ({
  createMatchPath: (absoluteBaseUrl, paths) => {
    const pathEntries = Object.entries(paths)
    return (requestedModule) => {
      for (const [pattern, [target]] of pathEntries) {
        const [prefix, suffix = ''] = pattern.split('*')
        if (
          requestedModule.startsWith(prefix) &&
          requestedModule.endsWith(suffix)
        ) {
          const matchedPart = requestedModule.slice(
            prefix.length,
            -suffix.length || undefined
          )
          const resolvedPath = target.replace('*', matchedPart)
          return require('node:path').join(absoluteBaseUrl, resolvedPath)
        }
      }
      return undefined
    }
  },
}))

const ruleTester = require('./ruleTester')
const rule = require('../lib/rules/same-level-import-only')

ruleTester.run('same-level-import-only', rule, {
  valid: [
    {
      code: 'import B from "Features/user/B"',
      filename: '/project/src/features/user/A.tsx',
      options: [{ patterns: ['**/src/features/user/**'] }],
    },
    {
      code: 'import B from "./B"',
      filename: '/project/src/features/user/A.tsx',
      options: [{ patterns: ['**/src/features/user/**'] }],
    },
    {
      code: 'import { something } from "./EventSchema/EventSchema"',
      filename: '/project/src/features/Event/state/index.ts',
      options: [{ patterns: ['**/src/features/Event/state/**'] }],
    },
    {
      code: 'import Utils from "../shared/Utils/Utils"',
      filename: '/project/src/features/user/A.tsx',
      options: [{ patterns: ['**/src/features/user/**'] }],
    },
    {
      code: 'import B from "./B"',
      filename: '/project/src/features/permission/A.tsx',
      options: [{ patterns: ['**/src/features/user/**'] }],
    },
    {
      code: 'import B from "Features/permission/B"',
      filename: '/project/src/features/user/A.tsx ',
      options: [{ patterns: ['**/src/features/user/**'] }],
    },
    {
      code: 'import F from "Features/user/B/shared/F"',
      filename: '/project/src/features/user/B/C.tsx ',
      options: [{ patterns: ['**/src/features/user/**'] }],
    },
    {
      code: 'import F from "./shared/F"',
      filename: '/project/src/features/user/B/C.tsx ',
      options: [{ patterns: ['**/src/features/user/**'] }],
    },
    {
      code: 'import F from "Features/user/B/shared/F"',
      filename: '/project/src/features/user/B/C/D/E.tsx ',
      options: [{ patterns: ['**/src/features/user/**'] }],
    },
    {
      code: 'import F from "../../../shared/F"',
      filename: '/project/src/features/user/B/C/D/E.tsx ',
      options: [{ patterns: ['**/src/features/user/**'] }],
    },
    {
      code: 'import C from "invalid/path/src/features/user/B/C"',
      filename: '/project/src/features/user/A.tsx',
      options: [{ patterns: ['**/src/features/user/**'] }],
    },
    {
      code: 'import C from "invalid/path/B/C"',
      filename: '/project/src/features/user/A.tsx',
      options: [{ patterns: ['**/src/features/user/**'] }],
    },
    {
      code: 'import B from "Features/user/shared/B/B"',
      filename: '/project/src/features/user/shared/A/A.tsx',
      options: [{ patterns: ['**/src/features/user/**'] }],
    },
    {
      code: 'import B from "../B/B"',
      filename: '/project/src/features/user/shared/A/A.tsx',
      options: [{ patterns: ['**/src/features/user/**'] }],
    },
    {
      code: 'import EmptyView from "./EmptyView"',
      filename: '/project/src/features/user/ChartDrawer/ChartDrawer.tsx',
      options: [{ patterns: ['**/src/features/user/**'] }],
    },
    {
      code: 'import { constant } from "./shared/ChartDrawer.const"',
      filename: '/project/src/features/user/ChartDrawer/ChartDrawer.tsx',
      options: [{ patterns: ['**/src/features/user/**'] }],
    },
    {
      code: 'import HeaderTitle from "./HeaderTitle/HeaderTitle"',
      filename: '/project/src/features/user/ChartDrawer/ChartDrawer.tsx',
      options: [{ patterns: ['**/src/features/user/**'] }],
    },
    {
      code: 'import * as Styled from "./ChartDrawer.styled"',
      filename: '/project/src/features/user/ChartDrawer/ChartDrawer.tsx',
      options: [{ patterns: ['**/src/features/user/**'] }],
    },
  ],
  invalid: [
    {
      code: 'import { hook } from "./EventSchema/EventSchema.hooks"',
      filename: '/project/src/features/Event/state/index.ts',
      options: [{ patterns: ['**/src/features/Event/state/**'] }],
      errors: [{ messageId: 'invalidImport' }],
    },
    {
      code: 'import { helper } from "./shared/Utils/Utils.helpers"',
      filename: '/project/src/features/user/A.tsx',
      options: [{ patterns: ['**/src/features/user/**'] }],
      errors: [{ messageId: 'invalidSharedImport' }],
    },
    {
      code: 'import C from "Features/user/B/C"',
      filename: '/project/src/features/user/A.tsx ',
      options: [{ patterns: ['**/src/features/user/**'] }],
      errors: [{ messageId: 'invalidImport' }],
    },
    {
      code: 'import D from "./B/C/D"',
      filename: '/project/src/features/user/A.tsx ',
      options: [{ patterns: ['**/src/features/user/**'] }],
      errors: [{ messageId: 'invalidImport' }],
    },
    {
      code: 'import A from "Features/user/A"',
      filename: '/project/src/features/user/B/C.tsx ',
      options: [{ patterns: ['**/src/features/user/**'] }],
      errors: [{ messageId: 'invalidImport' }],
    },
    {
      code: 'import A from "../A/E"',
      filename: '/project/src/features/user/B/C.tsx ',
      options: [{ patterns: ['**/src/features/user/**'] }],
      errors: [{ messageId: 'invalidImport' }],
    },
    {
      code: 'import F from "./C/shared/F"',
      filename: '/project/src/features/user/B.tsx ',
      options: [{ patterns: ['**/src/features/user/**'] }],
      errors: [{ messageId: 'invalidSharedImport' }],
    },
    {
      code: 'import F from "./C/D/E/shared/F"',
      filename: '/project/src/features/user/B.tsx ',
      options: [{ patterns: ['**/src/features/user/**'] }],
      errors: [{ messageId: 'invalidSharedImport' }],
    },
    {
      code: 'import F from "./shared/A/B"',
      filename: '/project/src/features/user/C.tsx ',
      options: [{ patterns: ['**/src/features/user/**'] }],
      errors: [{ messageId: 'invalidSharedImport' }],
    },
    {
      code: 'import F from "./A/B"',
      filename: '/project/src/features/user/shared/C.tsx ',
      options: [{ patterns: ['**/src/features/user/**'] }],
      errors: [{ messageId: 'invalidImport' }],
    },
    {
      code: 'import C from "../B/C"',
      filename: '/project/src/features/user/shared/A/A.tsx',
      options: [{ patterns: ['**/src/features/user/**'] }],
      errors: [{ messageId: 'invalidImport' }],
    },
    {
      code: 'import B from "./B/index"',
      filename: '/project/src/features/user/A.tsx',
      options: [{ patterns: ['**/src/features/user/**'] }],
      errors: [{ messageId: 'invalidImport' }],
    },
  ],
})
