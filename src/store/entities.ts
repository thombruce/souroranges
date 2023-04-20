import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { v4 as uuidv4 } from "uuid"
import { unionBy as _unionBy } from 'lodash'

import db from "../plugins/loki"

interface Entity {
  id: string
  databaseID: string | string[]
  name: string
}

export const useEntitiesStore = defineStore('entities', () => {
  // Setup
  let entitiesData: any

  // State
  const entityList = ref([] as Entity[])

  // Getters
  const forDatabase = computed(() => (databaseID: string | string[]) => {
    return entityList.value.filter((object) => object.databaseID === databaseID)
  })

  // Actions
  function initStore(databaseID: string | string[]) {
    entitiesData = db.getCollection('entities')

    if(!entitiesData){
      entitiesData = db.addCollection('entities', { unique: ['id'], indices: ['id', 'databaseID'], autoupdate: true })
    }

    let data = entitiesData.find({ databaseID })

    entityList.value = _unionBy(entityList.value, data, 'id')
  }

  function addEntity(name: string, databaseID: string | string[]) {
    let newEntity = { name, id: uuidv4(), databaseID }

    entitiesData.insert(newEntity)
    entityList.value.push(newEntity)
  }

  function deleteEntity(itemID: string) {
    entitiesData.chain().find({ id: itemID }).remove()
    entityList.value = entityList.value.filter((object) => {
      return object.id !== itemID
    })
  }

  return { entityList, forDatabase, initStore, addEntity, deleteEntity }
})
