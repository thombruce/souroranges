<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useRoute } from "vue-router"
import { useDatabasesStore } from "../../store/databases"

import { useAttributeDefinitionsStore } from "../../store/attributeDefinitions"

import AttributeDefinitionsList from "../../components/AttributeDefinitions/List.vue"
import AttributeDefinitionsForm from "../../components/AttributeDefinitions/Form.vue"

const databasesStore = useDatabasesStore()
const { find: findDatabase } = storeToRefs(databasesStore)

const route = useRoute()

const database = findDatabase.value(route.params.id)

const attributeDefinitionsStore = useAttributeDefinitionsStore()
attributeDefinitionsStore.initStore()
</script>

<template lang="pug">
h1 {{ database?.name }}
AttributeDefinitionsList
AttributeDefinitionsForm
hr
RouterView
</template>
