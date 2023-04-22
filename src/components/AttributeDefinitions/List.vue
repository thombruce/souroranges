<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useAttributeDefinitionsStore } from "../../store/attributeDefinitions"
import { useRoute } from "vue-router"

const store = useAttributeDefinitionsStore()
const { forDatabase: attributeDefinitions } = storeToRefs(store)
const { deleteAttributeDefinition } = store
const route = useRoute()
</script>

<template lang="pug">
ul
  li(v-for="entity in attributeDefinitions(route.params.id)" :key="entity.id")
    span {{ entity.name }}
    strong.text-red-600(@click="deleteAttributeDefinition(entity.id)") Delete
</template>
