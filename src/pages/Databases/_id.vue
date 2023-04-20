<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useRoute } from "vue-router"
import { useDatabasesStore } from "../../store/databases"

const databasesStore = useDatabasesStore()
const { find: findDatabase } = storeToRefs(databasesStore)

const route = useRoute()

const database = findDatabase.value(route.params.id)
</script>

<template lang="pug">
h1 {{ database?.name }}
RouterView
</template>
