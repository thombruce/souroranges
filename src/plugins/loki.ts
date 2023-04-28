import { useDatabasesStore } from '../store/databases'

import { process } from '@electron/remote'

var fs = require('fs')
const loki = require("lokijs")
const LokiFsStructuredAdapter = require("lokijs/src/loki-fs-structured-adapter")

let dbName = 'marmalade.db', db: any

var userAgent = navigator.userAgent.toLowerCase()
if (userAgent.indexOf(' electron/') > -1) {
  let currentDir = '.'

  console.log(process.env)

  if (process.platform === 'win32' && process.env.PORTABLE_EXECUTABLE_DIR) {
    currentDir = process.env['PORTABLE_EXECUTABLE_DIR']
  }

  var dir = currentDir + '/' + dbName

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir)
  }

  var fsStructuredAdapter = new LokiFsStructuredAdapter('loki')

  db = new loki(dir + '/store', { autosave: true, autoload: true, autoloadCallback: initStore, adapter: fsStructuredAdapter })
} else {
  db = new loki(dbName, { autosave: true, autoload: true, autoloadCallback: initStore })
}

function initStore() {
  const store = useDatabasesStore()
  store.initStore()
}

export default db
