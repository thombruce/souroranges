<script setup lang="ts">
import { useEntitiesStore } from "../../store/entities"

const store = useEntitiesStore()

store.initStore()
</script>

<template lang="pug">
RouterView
</template>
