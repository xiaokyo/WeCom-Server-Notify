const fs = require('fs')

/**
 * 获取scopes
 * @returns scopes
 */
function getScopeEnum() {
  const dirs = fs.readdirSync('./packages') || []
  dirs.unshift('root')
  return dirs
}

module.exports = {
  extents: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'improvement',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
    'scope-enum': [2, 'always', getScopeEnum()],
    'scope-empty': [2, 'never'],
  },
}
