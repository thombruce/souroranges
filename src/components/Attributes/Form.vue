<script setup lang="ts">
import { ref } from "vue"
import { useRoute } from "vue-router"

import { useAttributesStore } from "../../store/attributes"

const entity = ref("")
const route = useRoute()
const store = useAttributesStore()

const props = defineProps({
  entityID: {
    type: String,
    required: true
  },
  attributeDefinitionID: {
    type: String,
    required: true
  }
})

function addItemAndClear(item: string) {
  if (item.length === 0) {
    return
  }

  store.addAttribute(item, props.entityID, props.attributeDefinitionID)
  entity.value = ""
}
</script>

<template lang="pug">
form(@submit.prevent="addItemAndClear(entity)")
  input(v-model="entity" type="text")
  button Add
</template>
