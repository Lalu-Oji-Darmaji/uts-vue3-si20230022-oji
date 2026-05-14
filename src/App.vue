<script setup>
import { RouterView } from "vue-router";
import AppHeader from "./components/layouts/AppHeader.vue";
</script>

<template>
  <div class="min-h-screen w-full flex items-center flex-col font-sans antialiased bg-gray-100">
    <AppHeader />
    <main class="relative flex-1 w-full">
      <RouterView />
    </main>
  </div>
</template>