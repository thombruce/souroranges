<script setup lang="ts">
import { storeToRefs } from "pinia"
import { ref } from "vue"
import { useRoute } from "vue-router"

import { useAttributesStore } from "../../store/attributes"

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

const { find: findAttribute } = storeToRefs(store)
const actualAttribute = findAttribute.value(props.entityID, props.attributeDefinitionID)

const attribute = actualAttribute ? ref(actualAttribute["value"]) : ref("")

function updateItem(item: string) {
  store.addOrUpdateAttribute(item, props.entityID, props.attributeDefinitionID)
}
</script>

<template lang="pug">
form(@submit.prevent="updateItem(attribute)")
  input(v-model="attribute" type="text")
</template>
