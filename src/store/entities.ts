import { ref } from "vue"
import { defineStore } from "pinia"
import { v4 as uuidv4 } from "uuid"

import db from "../plugins/loki"

var _ = require('lodash')

interface Entity {
  item: string
  id: string
  databaseID: string | string[]
}

export const useEntitiesStore = defineStore('entities', () => {
  // Setup
  let entitiesData: any

  // State
  const entityList = ref([] as Entity[])

  // Getters
  const forDatabase = (databaseID: string | string[]) => {
    return entityList.value.filter((object) => object.databaseID === databaseID)
  }

  // Actions
  function initStore(databaseID: string | string[]) {
    entitiesData = db.getCollection('entities')

    if(!entitiesData){
      entitiesData = db.addCollection('entities', { unique: ['id'], indices: ['id'], autoupdate: true })
    }

    let data = entitiesData.where((object: any) => object.databaseID === databaseID)

    entityList.value = _.unionBy(entityList.value, data, 'id')
  }

  function addEntity(item: string, databaseID: string | string[]) {
    let newEntity = { item, id: uuidv4(), databaseID }

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
