<template>
  <div class="Barang-page min-h-screen p-10 font-sans">
    <div class="flex justify-between items-end mb-8 border-b-2 border-indigo-100 pb-5">
      <div>
        <h1 class="text-blue-900 text-2xl font-extrabold tracking-tight">DATA INVENTORI BARANG</h1>
        <p class="text-slate-500 mt-1 text-sm font-medium">{{ infoHasil }}</p>
      </div>
      <RouterLink to="/tambah">
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded shadow-md transition-colors font-semibold">
          + Tambah Barang
        </button>
      </RouterLink>
    </div>
    <div class="flex gap-4 mb-6">
      <div class="flex-[2] relative">
        <input v-model.trim="filter.search" v-focus type="text" placeholder="Cari nama atau deskripsi..."
          class="w-full px-4 py-2.5 border bg-white border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          @keyup.escape="filter.search = ''" />
        <button v-if="filter.search" @click="filter.search = ''"
          class="absolute right-3 top-3 text-slate-400 hover:text-slate-600">✕</button>
      </div>

      <select v-model="filter.kategori"
        class="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg bg-white text-blue-900 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer">
        <option value="">Semua Kategori</option>
        <option v-for="kat in daftarKategori" :key="kat" :value="kat">
          {{ kat }}
        </option>
      </select>
    </div>
    <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-blue-900 text-white text-left uppercase text-xs tracking-wider">
            <th class="p-4 w-1/4">Nama Barang</th>
            <th class="p-4 w-2/5">Deskripsi</th>
            <th class="p-4 w-[15%]">Kategori</th>
            <th class="p-4 w-1/5 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="isLoading">
            <td colspan="4" class="p-10 text-center text-blue-600 font-medium animate-pulse">
              Menghubungkan ke database...
            </td>
          </tr>
          <tr v-else-if="barangTerfilter.length === 0">
            <td colspan="4" class="p-16 text-center">
              <p class="text-slate-500 text-lg mb-4">📭 Tidak ada barang yang cocok.</p>
              <button @click="resetFilter"
                class="bg-blue-50 text-blue-600 border border-blue-200 px-6 py-2 rounded-md hover:bg-blue-100 transition-colors">
                Reset Filter
              </button>
            </td>
          </tr>
          <tr v-for="barang in barangTerfilter" :key="barang.id" class="hover:bg-blue-50/50 transition-colors">
            <td class="p-4 text-slate-800 font-bold" v-highlight="filter.search">
              {{ barang.nama }}
            </td>
            <td class="p-4 text-slate-600 text-sm leading-relaxed" v-highlight="filter.search">
              {{ barang.deskripsi }}
            </td>
            <td class="p-4">
              <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                {{ barang.kategori }}
              </span>
            </td>
            <td class="p-4 text-center">
              <div class="flex gap-2 justify-center">
                <RouterLink :to="{ name: 'edit-barang', params: { id: barang.id } }">
                  <button @click="goToDetail(barang.id)"
                    class="border border-blue-600 text-blue-600 px-4 py-1.5 rounded text-sm font-semibold hover:bg-blue-600 hover:text-white transition-all">
                    Edit
                  </button>
                </RouterLink>
                <button @click="konfirmasiHapus(barang.id)"
                  class="border border-red-500 text-red-500 px-4 py-1.5 rounded text-sm font-semibold hover:bg-red-500 hover:text-white transition-all">
                  Hapus
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useBarangStore } from "@/stores/barang";
import { useRouter } from "vue-router";
import { RouterLink } from "vue-router";
const router = useRouter();
const barangStore = useBarangStore();
const {
  barangTerfilter,
  daftarKategori,
  isLoading,
  filter,
  infoHasil
} = storeToRefs(barangStore);

const { ambilSemuaBarang, resetFilter, hapusBarang } = barangStore;

onMounted(async () => {
  if (barangStore.daftarBarang.length === 0) {
    await ambilSemuaBarang();
  }
});

function goToDetail(id) {
  router.push({ name: "detail-barang", params: { id } });
}

const konfirmasiHapus = (id) => {
  if (confirm("Apakah Anda yakin ingin menghapus barang ini?")) {
    hapusBarang(id);
  }
};
</script>