<script setup lang="ts">
import { useRoute } from "vue-router"

import { useEntitiesStore } from "../../store/entities"

const route = useRoute()
const store = useEntitiesStore()

function addItemAndClear() {
  store.addEntity(route.params.id)
}
</script>

<template lang="pug">
form(@submit.prevent="addItemAndClear()")
  button Add
</template>
