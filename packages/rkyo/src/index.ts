#!/usr/bin/env node
import moduleAlias from 'module-alias'
import fs from 'fs'
import path from 'path'
import { program as p } from 'commander'

moduleAlias.addAliases({
  '@': __dirname + '/',
})

p.version(require('../package.json').version)

function CMD({ command, description, action }) {
  p.command(command).description(description).action(action)
}

const dirs = fs.readdirSync(path.resolve(__dirname, './bin'), { encoding: 'utf-8' })
dirs.forEach(filename => {
  if (filename.indexOf('.js') !== -1) {
    const cmds = require('./bin/' + filename.replace('.js', '')).default()

    if (cmds instanceof Array) {
      cmds.forEach(obj => CMD(obj))
    } else {
      CMD(cmds)
    }
  }
})
p.parse(process.argv)
