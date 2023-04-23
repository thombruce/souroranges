<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useEntitiesStore } from "../../store/entities"
import { useAttributeDefinitionsStore } from "../../store/attributeDefinitions"
import { useRoute } from "vue-router"

import AttributeForm from "../Attributes/Form.vue"

const store = useEntitiesStore()
const attributeDefinitionsStore = useAttributeDefinitionsStore()
const { forDatabase: entities } = storeToRefs(store)
const { forDatabase: attributeDefinitions } = storeToRefs(attributeDefinitionsStore)
const { deleteEntity } = store
const route = useRoute()
</script>

<template lang="pug">
.relative.overflow-x-auto
  table.w-full.text-sm.text-left.text-gray-500
    thead.text-xs.text-gray-700.uppercase.bg-gray-50
      tr
        th.px-6.py-3(v-for="attributeDefinition in attributeDefinitions(route.params.id)" scope="col")
          | {{ attributeDefinition.name }}
        th.px-6.py-3(scope="col")
          span.sr-only Edit
    tbody
      tr.bg-white.border-b(v-for="entity in entities(route.params.id)" :key="entity.id")
        td.px-6.py-4(v-for="attributeDefinition in attributeDefinitions(route.params.id)" :key="attributeDefinition.id")
          AttributeForm(:entityID="entity.id" :attributeDefinitionID="attributeDefinition.id" :type="attributeDefinition.type")
        td.px-6.py-4
          strong.text-red-600(@click="deleteEntity(entity.id)") Delete
</template>
