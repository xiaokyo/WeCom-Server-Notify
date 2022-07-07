export default function ({ types: t }) {
  return {
    visitor: {
      Identifier(path, state) {
        if (path.node.name !== 'console') return

        /**
         * 找到顶级表达式, remove console.log
         */
        if (t.isExpressionStatement(path.parentPath.parentPath.parentPath)) {
          path.parentPath.parentPath.parentPath.remove()
        }
      },
    },
  }
}
