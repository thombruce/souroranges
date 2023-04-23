import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { v4 as uuidv4 } from "uuid"

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

export const useAttributeDefinitionsStore = defineStore('attributeDefinitions', () => {
  // State
  const attributeDefinitionList = ref({} as any)

  // Getters
  const forDatabase = computed(() => (databaseID: string | string[]) => {
    return attributeDefinitionList.value.find({ databaseID })
  })

  // Actions
  function initStore() {
    attributeDefinitionList.value = db.getCollection('attributeDefinitions')

    if(!attributeDefinitionList.value){
      attributeDefinitionList.value = db.addCollection('attributeDefinitions', { unique: ['id'], indices: ['id', 'databaseID'], autoupdate: true })
    }
  }

  function addAttributeDefinition(name: string, databaseID: string | string[], type: string) {
    let newAttributeDefinition = { name, id: uuidv4(), databaseID, type: TYPES.indexOf(type) }

    attributeDefinitionList.value.insert(newAttributeDefinition)
  }

  function deleteAttributeDefinition(itemID: string) {
    attributeDefinitionList.value.chain().find({ id: itemID }).remove()
  }

  return { attributeDefinitionList, forDatabase, initStore, addAttributeDefinition, deleteAttributeDefinition }
})
