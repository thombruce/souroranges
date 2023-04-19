<script setup lang="ts">
import { useDatabasesStore } from "../../store/databases"
import { storeToRefs } from "pinia"

const store = useDatabasesStore()
const { databaseList } = storeToRefs(store)
const { deleteDatabase } = store
</script>

<template lang="pug">
ul
  li(v-for="database in databaseList" :key="database.id")
    RouterLink(:to="{ name: 'List', params: { id: database.id }}") {{ database.name }}
    strong.text-red-600(@click="deleteDatabase(database.id)") Delete
</template>
