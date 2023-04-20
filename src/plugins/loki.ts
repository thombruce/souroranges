import { useDatabasesStore } from '../store/databases'

var fs = require('fs')
const loki = require("lokijs")
const LokiFsStructuredAdapter = require("lokijs/src/loki-fs-structured-adapter")

let dbName = 'marmalade.db', db: any

var userAgent = navigator.userAgent.toLowerCase()
if (userAgent.indexOf(' electron/') > -1) {
  var dir = './' + dbName

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
