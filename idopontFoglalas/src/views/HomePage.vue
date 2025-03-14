<template>
  <div class="conatiner d-flex flex-column align-items-center justify-content-center">
    <h1>Orvosi Rendelő</h1>

    <button class="btn btn-primary mt-3" @click="router.push('/idopontfoglalas')">Időpontfoglalás</button>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<style scoped>

</style>