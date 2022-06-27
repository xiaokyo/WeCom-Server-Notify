export default function ({ types: t }) {
  return {
    visitor: {
      Identifier(path, state) {
        if (path.node.name === 'console') {
          path.parentPath.parentPath.remove()
          //   path.remove()
        }
      },
    },
  }
}
