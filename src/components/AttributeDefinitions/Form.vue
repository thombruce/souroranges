<script setup lang="ts">
import { ref } from "vue"
import { useRoute } from "vue-router"

import { useAttributeDefinitionsStore } from "../../store/attributeDefinitions"

const entity = ref("")
const route = useRoute()
const store = useAttributeDefinitionsStore()

function addItemAndClear(item: string) {
  if (item.length === 0) {
    return
  }

  store.addAttributeDefinition(item, route.params.id, "string")
  entity.value = ""
}
</script>

<template lang="pug">
form(@submit.prevent="addItemAndClear(entity)")
  input(v-model="entity" type="text")
  button Add
</template>
