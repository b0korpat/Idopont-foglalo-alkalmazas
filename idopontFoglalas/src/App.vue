<script setup>
import { RouterView } from 'vue-router'
import {useidopontStore} from "@/stores/idopont.js";

const idopontStore = useidopontStore()

idopontStore.getIdopontok();

</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
