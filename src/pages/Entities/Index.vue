<script setup lang="ts">
import { useRoute } from "vue-router"
import { useEntitiesStore } from "../../store/entities"

import EntitiesList from "../../components/Entities/List.vue"
import EntitiesForm from "../../components/Entities/Form.vue"

const store = useEntitiesStore()
const route = useRoute()

store.initStore(route.params.id)
</script>

<template lang="pug">
EntitiesList
EntitiesForm
</template>
