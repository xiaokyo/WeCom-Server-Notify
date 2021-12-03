const { scopes, types } = require('./.cz-config.js')
const commitPrefixs = types.map(_ => _.value)

module.exports = {
  extents: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      commitPrefixs,
    ],
    'scope-enum': [2, 'always', scopes],
    'scope-empty': [2, 'never'],
  },
}
