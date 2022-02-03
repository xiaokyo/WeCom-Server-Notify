/**
 * @description cj公司模版的rm三端模版转成ykfe模版
 */

import gulp from 'gulp'
import through from 'through2'
import rename from 'gulp-rename'

function temp2ssr() {
  // 创建一个 stream 通道，以让每个文件通过
  return through.obj(function (file, enc, cb) {
    // 只针对buffer
    if (file.isBuffer()) {
      let temp = file.contents.toString()
      // console.log(temp)
      temp = temp.replace(new RegExp(`'./styles.less'`, 'gim'), `'./index.module.less'`)
      temp = temp.replace(new RegExp(`'./styles'`, 'gim'), `'./index.module.less'`)
      temp = temp.replace(new RegExp(`index.web.less`, 'gim'), `index.module.less`)
      temp = temp.replace(new RegExp(`index.less`, 'gim'), `index.module.less`)

      temp = temp.replace(new RegExp(`@/components/web`, 'gim'), `@/components`)
      // 做你想做的操作
      file.contents = Buffer.from(temp)
    }

    // 确保文件进入下一个 gulp 插件
    this.push(file)

    // 告诉 stream 引擎，我们已经处理完了这个文件
    cb()
  })
}

export default () => {
  return [
    {
      command: 'rn2ssr [baseUrl]',
      description: 'cj公司模版的rm三端模版转成ykfe模版',
      action(baseUrl = `src/pages/my`) {
        const distUrl = 'template/' + baseUrl.split('/')[baseUrl.split('/').length - 1]
        gulp
          .src([
            `${baseUrl}/**/*.tsx`,
            `${baseUrl}/**/*.ts`,
            `!${baseUrl}/**/_mobile.*`,
            `!${baseUrl}/**/*.native.*`,
            `!${baseUrl}/index.tsx`,
            `!${baseUrl}/**/styles/index.ts`,
          ])
          .pipe(temp2ssr())
          .pipe(
            rename(function (path) {
              if (path.basename == '_web' && path.dirname == '.') {
                path.basename = 'render'
              } else if (path.basename == '_web') {
                path.basename = 'index._web'
              }
            })
          )
          .pipe(gulp.dest(distUrl))

        gulp
          .src([`${baseUrl}/**/*.less`, `!${baseUrl}/**/*.mobile.less`])
          .pipe(
            rename(function (path) {
              if (path.dirname.endsWith('styles')) {
                path.dirname = path.dirname.replace(/(\/|)styles$/gi, '')
              }
              path.basename = 'index.module'
              // path.extname = '.less'
            })
          )
          .pipe(gulp.dest(distUrl))
      },
    },
  ]
}
