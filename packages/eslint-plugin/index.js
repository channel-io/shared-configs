const hooksDepsElementNewline = require('./lib/rules/hooks-deps-element-newline')
const noClassnamesWithOneArgument = require('./lib/rules/no-classnames-with-one-argument')
const noTranslateWithTemplateLiteral = require('./lib/rules/no-translate-with-template-literal')
const pascalCaseEnumName = require('./lib/rules/pascal-case-enum-name')
const pascalCaseInterfaceName = require('./lib/rules/pascal-case-interface-name')
const pascalCaseTypeName = require('./lib/rules/pascal-case-type-name')
const preventDestructuredArgumentCallbackInIntersectionObserver = require('./lib/rules/prevent-destructured-argument-callback-in-intersection-observer')

module.exports = {
  rules: {
    'hooks-deps-element-newline': hooksDepsElementNewline,
    'no-classnames-with-one-argument': noClassnamesWithOneArgument,
    'no-translate-with-template-literal': noTranslateWithTemplateLiteral,
    'pascal-case-enum-name': pascalCaseEnumName,
    'pascal-case-interface-name': pascalCaseInterfaceName,
    'pascal-case-type-name': pascalCaseTypeName,
    'prevent-destructured-argument-callback-in-intersection-observer':
      preventDestructuredArgumentCallbackInIntersectionObserver,
  },
}
