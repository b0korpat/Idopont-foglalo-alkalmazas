<script setup>
import { RouterView } from 'vue-router'
import {useidopontStore} from "@/stores/idopont.js";

const idopontStore = useidopontStore()

idopontStore.getIdopontok();

</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Orvosi rendelő</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link active">Főoldal</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/idopontfoglalas" class="nav-link active">Időpontfoglalás</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <RouterView />
</template>

<style scoped>

</style>
