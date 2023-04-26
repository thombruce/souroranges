<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useEntitiesStore } from "../../store/entities"
import { useAttributeDefinitionsStore } from "../../store/attributeDefinitions"
import { useRoute } from "vue-router"

import EntitiesForm from "../../components/Entities/Form.vue"
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
  table
    thead
      tr
        th(v-for="attributeDefinition in attributeDefinitions(route.params.id)" scope="col")
          | {{ attributeDefinition.name }}
        th(scope="col")
          span.sr-only Edit
    tbody
      tr(v-for="entity in entities(route.params.id)" :key="entity.id")
        td(v-for="attributeDefinition in attributeDefinitions(route.params.id)" :key="entity.id + attributeDefinition.id")
          AttributeForm(:entityID="entity.id" :attributeDefinitionID="attributeDefinition.id" :type="attributeDefinition.type")
        td
          strong.text-red-600(@click="deleteEntity(entity.id)") Delete
      tr
        td(v-for="attributeDefinition in attributeDefinitions(route.params.id)" :key="attributeDefinition.id")
        td
          EntitiesForm
</template>
