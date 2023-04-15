import { defineStore } from "pinia"

interface Entity {
  item: string
  id: number
  completed: boolean
}

export const entities = defineStore("entityList", {
  state: () => ({
    entityList: [] as Entity[],
    id: 0,
  }),
  actions: {
    addEntity(item: string) {
      this.entityList.push({ item, id: this.id++, completed: false })
    },
    deleteEntity(itemID: number) {
      this.entityList = this.entityList.filter((object) => {
        return object.id !== itemID
      });
    },
  },
})
