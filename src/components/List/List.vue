<script setup lang="ts">
import { useRoute } from "vue-router"
import { useEntitiesStore } from "../../store/entities"

const store = useEntitiesStore()
const { forDatabase, deleteEntity } = store
const route = useRoute()

const entities = forDatabase(route.params.id)
</script>

<template lang="pug">
ul
  li(v-for="entity in entities" :key="entity.id")
    span {{ entity.name }}
    span(@click="deleteEntity(entity.id)") &#10060;
</template>
