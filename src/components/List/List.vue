<script setup lang="ts">
import { entities } from "../../store/entities"
import { storeToRefs } from "pinia"

const store = entities()
const { entityList } = storeToRefs(store)
const { deleteEntity } = store
</script>

<template lang="pug">
ul
  li(v-for="entity in entityList" :key="entity.id")
    span {{ entity.item }}
    span(@click="deleteEntity(entity.id)") &#10060;
</template>
