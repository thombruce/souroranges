<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useEntitiesStore } from "../../store/entities"
import { useRoute } from "vue-router"

const store = useEntitiesStore()
const { forDatabase } = storeToRefs(store)
const { deleteEntity } = store
const route = useRoute()

const entities = forDatabase.value(route.params.id)
</script>

<template lang="pug">
ul
  li(v-for="entity in entities" :key="entity.id")
    span {{ entity.name }}
    span(@click="deleteEntity(entity.id)") &#10060;
</template>
