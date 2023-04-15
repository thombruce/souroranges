<script setup lang="ts">
import { ref } from "vue"

import { entities } from "../../store/entities"

const entity = ref("")

// use Pinia store:
const store = entities()

function addItemAndClear(item: string) {
  if (item.length === 0) {
    return
  }
  // invokes function in the store:
  store.addEntity(item)
  entity.value = ""
}
</script>

<template lang="pug">
form(@submit.prevent="addItemAndClear(entity)")
  input(v-model="entity" type="text")
  button Add
</template>
