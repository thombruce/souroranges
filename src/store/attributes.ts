import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { v4 as uuidv4 } from "uuid"
import { unionBy as _unionBy } from 'lodash'

import db from "../plugins/loki"

interface Attribute {
  id: string
  entityID: string | string[]
  attributeDefinitionID: string | string[]
  value: string | number
}

export const useAttributesStore = defineStore('attributes', () => {
  // Setup
  let attributesData: any

  // State
  const attributeList = ref([] as Attribute[])

  // Getters
  const forEntity = computed(() => (entityID: string | string[]) => {
    return attributeList.value.filter((object) => object.entityID === entityID)
  })

  const find = computed(() => (entityID: string | string[], attributeDefinitionID: string | string[]) => {
    return forEntity.value(entityID).find(attribute => attribute.attributeDefinitionID === attributeDefinitionID)
  })

  // Actions
  function initStore() { // TODO: Limit load to Entities for current DB.
    attributesData = db.getCollection('attributes')

    if(!attributesData){
      attributesData = db.addCollection('attributes', { unique: ['id'], indices: ['id', 'entityID', 'attributeDefinitionID'], autoupdate: true })
    }

    let data = attributesData.data // TODO: Limit load to Entities for current DB.

    attributeList.value = _unionBy(attributeList.value, data, 'id')
  }

  function addOrUpdateAttribute(value: string | number, entityID: string | string[], attributeDefinitionID: string | string[]) {
    let attribute = attributesData.find({ entityID, attributeDefinitionID })[0]

    if(!attribute){
      attribute = attributesData.insert({ value, id: uuidv4(), entityID, attributeDefinitionID })
    } else {
      attribute.value = value
      attribute = attributesData.update(attribute)
    }

    attributeList.value.push(attribute)
  }

  function deleteAttribute(itemID: string) {
    attributesData.chain().find({ id: itemID }).remove()
    attributeList.value = attributeList.value.filter((object) => {
      return object.id !== itemID
    })
  }

  return { attributeList, find, forEntity, initStore, addOrUpdateAttribute, deleteAttribute }
})
