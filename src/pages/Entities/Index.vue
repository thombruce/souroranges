<script setup lang="ts">
import { useRoute } from "vue-router"
import { useEntitiesStore } from "../../store/entities"

import ListView from "../../components/List/View.vue"

const store = useEntitiesStore()
const route = useRoute()

store.initStore(route.params.id)
</script>

<template lang="pug">
ListView
</template>
