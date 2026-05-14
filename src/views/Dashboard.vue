<template>
  <div class="p-6 min-h-screen font-sans">
    <div class="mb-8 border-l-4 border-indigo-600 pl-4">
      <h1 class="text-2xl font-black text-gray-800 tracking-tight">Statistik Stok Barang</h1>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="item in tampilanStatistik" :key="item.id"
          class="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-4">
            <span class="text-2xl">{{ item.ikon }}</span>
          </div>
          <p class="text-gray-500 text-xs font-bold uppercase mb-1">{{ item.label }}</p>
          <h2 class="text-4xl font-black text-gray-900 tracking-tighter">
            {{ item.nilai.toLocaleString() }}
          </h2>
        </div>
      </div>
      <div class="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
        <h3 class="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          Atur Stok
        </h3>
        <div class="space-y-6">
          <div class="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
            <label class="text-[10px] font-black text-gray-400 uppercase block mb-3">Stok Masuk</label>
            <div class="flex items-center justify-center gap-6">
              <button @click="barang.stokMasuk--" :disabled="barang.stokMasuk <= 0">－</button>
              <span class="text-2xl font-black w-12 text-gray-700">{{ barang.stokMasuk }}</span>
              <button @click="barang.stokMasuk++">＋</button>
            </div>
          </div>
          <div class="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
            <label class="text-[10px] font-black text-gray-400 uppercase block mb-3">Stok Keluar</label>
            <div class="flex items-center justify-center gap-6">
              <button @click="kurangiKeluar" :disabled="barang.stokKeluar <= 0">－</button>
              <span class="text-2xl font-black w-12 text-gray-700">{{ barang.stokKeluar }}</span>
              <button @click="tambahKeluar">＋</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";

const barang = reactive({
  totalBarang: 150,
  stokKeluar: 50,
  stokMasuk: 450,
});

const totalStok = computed(() => barang.stokMasuk - barang.stokKeluar);

const tampilanStatistik = computed(() => [
  {
    id: 1,
    ikon: "📦",
    label: "Total Barang",
    nilai: barang.totalBarang,
  },
  {
    id: 2,
    ikon: "📥",
    label: "Stok Masuk",
    nilai: barang.stokMasuk,
  },
  {
    id: 3,
    ikon: "📤",
    label: "Stok Keluar",
    nilai: barang.stokKeluar,
  },
  {
    id: 4,
    ikon: "🗳️",
    label: "Total Stok",
    nilai: totalStok.value,
  },
]);

function tambahKeluar() {
  if (totalStok.value > 0) barang.stokKeluar++;
}

function kurangiKeluar() {
  if (barang.stokKeluar > 0) barang.stokKeluar--;
}
</script>