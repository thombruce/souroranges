import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { v4 as uuidv4 } from "uuid"

import db from "../plugins/loki"

export const useAttributesStore = defineStore('attributes', () => {
  // State
  const attributeList = ref({} as any)

  // Getters
  const forEntity = computed(() => (entityID: string | string[]) => {
    return attributeList.value.find({ entityID })
  })

  const find = computed(() => (entityID: string | string[], attributeDefinitionID: string | string[]) => {
    return attributeList.value.find({ entityID, attributeDefinitionID })[0]
  })

  // Actions
  function initStore() {
    attributeList.value = db.getCollection('attributes')

    if(!attributeList.value){
      attributeList.value = db.addCollection('attributes', { unique: ['id'], indices: ['id', 'entityID', 'attributeDefinitionID'], autoupdate: true })
    }
  }

  function addOrUpdateAttribute(value: string | number, entityID: string | string[], attributeDefinitionID: string | string[]) {
    let attribute = attributeList.value.find({ entityID, attributeDefinitionID })[0]

    if(!attribute){
      attribute = attributeList.value.insert({ value, id: uuidv4(), entityID, attributeDefinitionID })
    } else {
      attribute.value = value
      attribute = attributeList.value.update(attribute)
    }
  }

  function deleteAttribute(itemID: string) {
    attributeList.value.chain().find({ id: itemID }).remove()
  }

  return { attributeList, find, forEntity, initStore, addOrUpdateAttribute, deleteAttribute }
})
