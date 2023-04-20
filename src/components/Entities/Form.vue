<script setup lang="ts">
import { ref } from "vue"
import { useRoute } from "vue-router"

import { useEntitiesStore } from "../../store/entities"

const entity = ref("")
const route = useRoute()
const store = useEntitiesStore()

function addItemAndClear(item: string) {
  if (item.length === 0) {
    return
  }

  store.addEntity(item, route.params.id)
  entity.value = ""
}
</script>

<template lang="pug">
form(@submit.prevent="addItemAndClear(entity)")
  input(v-model="entity" type="text")
  button Add
</template>
