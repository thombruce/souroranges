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
  },
  type: {
    type: Number,
    required: true
  }
})

const { find: findAttribute } = storeToRefs(store)
const actualAttribute = findAttribute.value(props.entityID, props.attributeDefinitionID)

const attribute = actualAttribute ? ref(actualAttribute["value"]) : ref("")

function updateItem(item: string | number) {
  store.addOrUpdateAttribute(item, props.entityID, props.attributeDefinitionID)
}
</script>

<template lang="pug">
form(@submit.prevent="updateItem(attribute)")
  input(v-if="type === 0" v-model="attribute" type="text" @blur="updateItem(attribute)")
  input(v-if="type === 1" v-model="attribute" type="number" @blur="updateItem(attribute)")
  input(v-if="type === 2" v-model="attribute" type="date" @blur="updateItem(attribute)")
  input(v-if="type === 3" v-model="attribute" type="url" @blur="updateItem(attribute)")
  input(v-if="type === 4" v-model="attribute" type="email" @blur="updateItem(attribute)")
  input(v-if="type === 5" v-model="attribute" type="tel" @blur="updateItem(attribute)")
</template>
