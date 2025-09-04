<template>
  <Navbar />

  <main class="p-6">
<!--    <BackButton v-if="!isHome" />-->

    <router-view />
  </main>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import BackButton from "./components/BackButton.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const isHome = computed(() => route.name === "home" || route.path === "/");
</script>
