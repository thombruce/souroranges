<script setup lang="ts">
import { ref } from "vue"
import { useRoute } from "vue-router"

import { useAttributeDefinitionsStore } from "../../store/attributeDefinitions"

const attributeDefinition = ref("")
const attributeDefinitionType = ref("string")
const route = useRoute()
const store = useAttributeDefinitionsStore()

function addItemAndClear(item: string, type: string) {
  if (item.length === 0) {
    return
  }

  store.addAttributeDefinition(item, route.params.id, type)
  attributeDefinition.value = ""
  attributeDefinitionType.value = "string"
}
</script>

<template lang="pug">
form(@submit.prevent="addItemAndClear(attributeDefinition, attributeDefinitionType)")
  input(v-model="attributeDefinition" type="text")
  select(v-model="attributeDefinitionType")
    option(value="string") String
    option(value="number") Number
    option(value="date") Date
  button Add
</template>
