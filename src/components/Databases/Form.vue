<script setup lang="ts">
import { ref } from "vue"

import { useDatabasesStore } from "../../store/databases"

const database = ref("")

// use Pinia store:
const store = useDatabasesStore()

function addItemAndClear(item: string) {
  if (item.length === 0) {
    return
  }
  // invokes function in the store:
  store.addDatabase(item)
  database.value = ""
}
</script>

<template lang="pug">
form(@submit.prevent="addItemAndClear(database)")
  input(v-model="database" type="text")
  button Add
</template>
