<script setup>
import Button from "../ui/button/Button.vue";
import { RouterLink } from "vue-router";
</script>
<template>
  <header
    class="sticky flex items-center justify-between mt-6 p-5 h-15 top-0 z-50 border-b bg-background/80 backdrop-blur-md shadow-sm w-4/5 rounded-4xl"
  >
    <nav class="hidden md:flex items-center gap-2">
      <RouterLink to="/" v-slot="{ isActive }">
        <Button
          size="sm"
          class="rounded-xl transition-all bg-transparent"
          :class="
            isActive
              ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
              : 'text-black hover:bg-blue-100'
          "
          >Dashborad</Button
        >
      </RouterLink>
      <RouterLink to="/barang" v-slot="{ isActive }">
        <Button
          size="sm"
          class="rounded-xl transition-all bg-transparent"
          :class="
            isActive
              ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
              : 'text-black hover:bg-blue-100'
          "
          >Barang</Button
        >
      </RouterLink>
      <RouterLink to="/riwayat" v-slot="{ isActive }">
        <Button
          size="sm"
          class="rounded-xl transition-all bg-transparent"
          :class="
            isActive
              ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
              : 'text-black hover:bg-blue-100'
          "
          >Riwayat</Button
        >
      </RouterLink>
    </nav>
    <h3 class="p-5 font-bold">SiIventaris</h3>
  </header>
</template>
