<script setup lang="ts">
import { useRoute } from "vue-router"
import { useEntitiesStore } from "../../store/entities"
import { useAttributesStore } from "../../store/attributes"

import EntitiesList from "../../components/Entities/List.vue"
import EntitiesForm from "../../components/Entities/Form.vue"

const store = useEntitiesStore()
const attributesStore = useAttributesStore()
const route = useRoute()

store.initStore()
attributesStore.initStore()
</script>

<template lang="pug">
EntitiesList
EntitiesForm
</template>
