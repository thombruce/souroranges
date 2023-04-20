import { ref } from "vue"
import { defineStore } from "pinia"
import { v4 as uuidv4 } from "uuid"

import db from "../plugins/loki"

interface Database {
  id: string
  name: string
  schema: object[]
}

const defaultSchema = () => {
  return [
    { id: uuidv4(), name: "Name", type: "string" }
  ]
}

export const useDatabasesStore = defineStore('databases', () => {
  // Setup
  let databasesData: any

  // State
  const databaseList = ref([] as Database[])

  // Getters
  // e.g. const doubleCount = computed(() => count.value * 2)

  // Actions
  function initStore() {
    databasesData = db.getCollection('databases')

    if(!databasesData){
        databasesData = db.addCollection('databases', { unique: ['id'], indices: ['id'], autoupdate: true })
    }

    databaseList.value.push(...databasesData.data)
  }

  function addDatabase(name: string) {
    let newDatabase = { id: uuidv4(), name, schema: defaultSchema() }

    databasesData.insert(newDatabase)
    databaseList.value.push(newDatabase)
  }

  function deleteDatabase(itemID: string) {
    databasesData.chain().find({ id: itemID }).remove()
    databaseList.value = databaseList.value.filter((object) => {
      return object.id !== itemID
    })
  }

  return { databaseList, initStore, addDatabase, deleteDatabase }
})
