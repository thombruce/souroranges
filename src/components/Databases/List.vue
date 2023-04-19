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
    span {{ database.name }}
    span(@click="deleteDatabase(database.id)") &#10060;
</template>
