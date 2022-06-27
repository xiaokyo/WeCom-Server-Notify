import * as babel from '@babel/core'

babel.transform(
  `
console.log('hello')
console.log(
    1,
    2,3,
    4,{}, '323'
)
function xixi() {

    console.log('aiaiaia')
    const x = 0;
}
`,
  {
    plugins: [require('../dist/index')],
  },
  function (err, result) {
    console.log('%cindex.js line:17 result.code', 'color: #007acc;', result.code)
  }
)
