import { ref } from "vue"
import { defineStore } from "pinia"
import { v4 as uuidv4 } from "uuid"

const loki = require("lokijs")

interface Entity {
  item: string
  id: string
  completed: boolean
}

export const entities = defineStore('entityList', () => {
  // Setup
  let db = new loki('marmalade.json', { autosave: true, autoload: true, autoloadCallback: initStore }), entitiesData: any

  function initStore() {
    entitiesData = db.getCollection('entities')

    if(!entitiesData){
       entitiesData = db.addCollection('entities', { unique: ['id'], indices: ['id'], autoupdate: true })
    }

    entityList.value.push(...entitiesData.data)
  }

  // State
  const entityList = ref([] as Entity[])

  // Getters
  // e.g. const doubleCount = computed(() => count.value * 2)

  // Actions
  function addEntity(item: string) {
    let newEntity = { item, id: uuidv4(), completed: false }

    entitiesData.insert(newEntity)
    entityList.value.push(newEntity)
  }

  function deleteEntity(itemID: string) {
    entitiesData.chain().find({ id: itemID }).remove()
    entityList.value = entityList.value.filter((object) => {
      return object.id !== itemID
    })
  }

  return { entityList, addEntity, deleteEntity }
})
