import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { v4 as uuidv4 } from "uuid"

import db from "../plugins/loki"

export const useDatabasesStore = defineStore('databases', () => {
  // State
  const databaseList = ref({} as any)

  // Getters
  const find = computed(() => (databaseID: string | string[]) =>
    databaseList.value.find({ id: databaseID })[0]
  )

  // Actions
  function initStore() {
    databaseList.value = db.getCollection('databases')

    if(!databaseList.value){
        databaseList.value = db.addCollection('databases', { unique: ['id'], indices: ['id'], autoupdate: true })
    }
  }

  function addDatabase(name: string) {
    let newDatabase = { id: uuidv4(), name }

    databaseList.value.insert(newDatabase)
  }

  function deleteDatabase(itemID: string) {
    databaseList.value.chain().find({ id: itemID }).remove()
  }

  return { databaseList, find, initStore, addDatabase, deleteDatabase }
})
