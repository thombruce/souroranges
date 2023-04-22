<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useRoute } from "vue-router"

import { useAttributeDefinitionsStore } from "../../store/attributeDefinitions"

import AttributesForm from "../../components/Attributes/Form.vue"
const route = useRoute()

const props = defineProps({
  entityID: {
    type: String,
    required: true
  }
})

const attributeDefinitionsStore = useAttributeDefinitionsStore()

const { forDatabase: attributeDefinitions } = storeToRefs(attributeDefinitionsStore)
</script>

<template lang="pug">
div
  div(
    v-for="attributeDefinition in attributeDefinitions(route.params.id)"
    :key="attributeDefinition.id"
  )
    strong {{ attributeDefinition.name }}
    AttributesForm(
      :entityID="entityID"
      :attributeDefinitionID="attributeDefinition.id"
    )
</template>
