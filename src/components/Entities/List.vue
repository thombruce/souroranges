<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useEntitiesStore } from "../../store/entities"
import { useRoute } from "vue-router"

import EntitiesItem from "./Item.vue"
import EntitiesForm from "./Form.vue"

const store = useEntitiesStore()
const { forDatabase: entities } = storeToRefs(store)
const { deleteEntity } = store
const route = useRoute()
</script>

<template lang="pug">
div
  div(v-for="entity in entities(route.params.id)" :key="entity.id")
    EntitiesItem(:entityID="entity.id")
    strong.text-red-600(@click="deleteEntity(entity.id)") Delete
EntitiesForm
</template>
