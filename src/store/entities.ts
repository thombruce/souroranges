import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { v4 as uuidv4 } from "uuid"

import db from "../plugins/loki"

export const useEntitiesStore = defineStore('entities', () => {
  // State
  const entityList = ref({} as any)

  // Getters
  const forDatabase = computed(() => (databaseID: string | string[]) => {
    return entityList.value.find({ databaseID })
  })

  // Actions
  function initStore() {
    entityList.value = db.getCollection('entities')

    if(!entityList.value){
      entityList.value = db.addCollection('entities', { unique: ['id'], indices: ['id', 'databaseID'], autoupdate: true })
    }
  }

  function addEntity(databaseID: string | string[]) {
    let newEntity = { id: uuidv4(), databaseID }

    entityList.value.insert(newEntity)
  }

  function deleteEntity(itemID: string) {
    entityList.value.chain().find({ id: itemID }).remove()
  }

  return { entityList, forDatabase, initStore, addEntity, deleteEntity }
})
