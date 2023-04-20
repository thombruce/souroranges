<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useEntitiesStore } from "../../store/entities"
import { useRoute } from "vue-router"

const store = useEntitiesStore()
const { forDatabase: entities } = storeToRefs(store)
const { deleteEntity } = store
const route = useRoute()
</script>

<template lang="pug">
ul
  li(v-for="entity in entities(route.params.id)" :key="entity.id")
    span {{ entity.name }}
    span(@click="deleteEntity(entity.id)") &#10060;
</template>
