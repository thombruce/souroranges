import { ref } from "vue"
import { defineStore } from "pinia"

const loki = require("lokijs")

interface Entity {
  item: string
  id: number
  completed: boolean
}

export const entities = defineStore('entityList', () => {
  // Setup
  let db = new loki('marmalade.json', { autosave: true, autoload: true, autoloadCallback: initStore }), entitiesData: any

  function initStore() {
    entitiesData = db.getCollection('entities', { autoupdate: true })

    if(!entitiesData){
       entitiesData = db.addCollection('entities');
    }

    entityList.value.push(...entitiesData.data)
  }

  // State
  const entityList = ref([] as Entity[])
  const id = ref(0)

  // Getters
  // e.g. const doubleCount = computed(() => count.value * 2)

  // Actions
  function addEntity(item: string) {
    let newEntity = { item, id: id.value++, completed: false }

    entitiesData.insert(newEntity)
    entityList.value.push(newEntity)
  }

  function deleteEntity(itemID: number) {
    entitiesData.chain().find({ id: itemID }).remove()
    entityList.value = entityList.value.filter((object) => {
      return object.id !== itemID
    })
  }

  return { entityList, id, addEntity, deleteEntity }
})
