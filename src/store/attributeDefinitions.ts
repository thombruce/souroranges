import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { v4 as uuidv4 } from "uuid"
import { unionBy as _unionBy } from 'lodash'

import db from "../plugins/loki"

const TYPES = Object.freeze([
  "string",
  "number",
  "date",
  "url",
  "email",
  "tel",
  "boolean",
])

interface AttributeDefinition {
  id: string
  databaseID: string | string[]
  name: string
  type: number
}

export const useAttributeDefinitionsStore = defineStore('attributeDefinitions', () => {
  // Setup
  let attributeDefinitionsData: any

  // State
  const attributeDefinitionList = ref([] as AttributeDefinition[])

  // Getters
  const forDatabase = computed(() => (databaseID: string | string[]) => {
    return attributeDefinitionList.value.filter((object) => object.databaseID === databaseID)
  })

  // Actions
  function initStore(databaseID: string | string[]) {
    attributeDefinitionsData = db.getCollection('attributeDefinitions')

    if(!attributeDefinitionsData){
      attributeDefinitionsData = db.addCollection('attributeDefinitions', { unique: ['id'], indices: ['id', 'databaseID'], autoupdate: true })
    }

    let data = attributeDefinitionsData.find({ databaseID })

    attributeDefinitionList.value = _unionBy(attributeDefinitionList.value, data, 'id')
  }

  function addAttributeDefinition(name: string, databaseID: string | string[], type: string) {
    let newAttributeDefinition = { name, id: uuidv4(), databaseID, type: TYPES.indexOf(type) }

    attributeDefinitionsData.insert(newAttributeDefinition)
    attributeDefinitionList.value.push(newAttributeDefinition)
  }

  function deleteAttributeDefinition(itemID: string) {
    attributeDefinitionsData.chain().find({ id: itemID }).remove()
    attributeDefinitionList.value = attributeDefinitionList.value.filter((object) => {
      return object.id !== itemID
    })
  }

  return { attributeDefinitionList, forDatabase, initStore, addAttributeDefinition, deleteAttributeDefinition }
})
