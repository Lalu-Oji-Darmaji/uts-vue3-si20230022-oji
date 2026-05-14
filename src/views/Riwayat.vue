<template>
  <div class="min-h-screen bg-slate-50 p-10 font-sans">
    <div class="w-full mb-8 border-b-2 border-indigo-100 pb-5 flex justify-between items-end">
      <div>
        <h1 class="text-blue-900 text-2xl font-extrabold tracking-tight uppercase">Riwayat Transaksi</h1>
        <p class="text-slate-500 mt-1 text-sm">Log aktivitas keluar masuk barang inventori.</p>
      </div>
      <RouterLink to="/barang">
        <button
          class="bg-slate-800 text-white px-5 py-2 rounded shadow-md hover:bg-slate-900 transition-all font-semibold text-sm">
          Kembali
        </button>
      </RouterLink>
    </div>
    <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <table class="w-full border-collapse text-left">
        <thead>
          <tr class="bg-slate-800 text-white uppercase text-xs tracking-wider">
            <th class="p-4">Tanggal & Waktu</th>
            <th class="p-4">Nama Barang</th>
            <th class="p-4">Kategori</th>
            <th class="p-4">Tipe</th>
            <th class="p-4 text-center">Jumlah</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-if="store.riwayat.length === 0">
            <td colspan="5" class="p-10 text-center text-slate-400 italic">
              Belum ada riwayat transaksi saat ini.
            </td>
          </tr>
          <tr v-for="log in store.riwayat" :key="log.id" class="hover:bg-slate-50 transition-colors">
            <td class="p-4 text-sm text-slate-500 font-medium">{{ log.tanggal }}</td>
            <td class="p-4 text-slate-800 font-bold">{{ log.nama }}</td>
            <td class="p-4">
              <span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-bold uppercase">
                {{ log.kategori }}
              </span>
            </td>
            <td class="p-4">
              <span :class="log.tipe === 'Masuk' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
                class="px-3 py-1 rounded-full text-xs font-black uppercase">
                {{ log.tipe }}
              </span>
            </td>
            <td class="p-4 text-center font-mono font-bold"
              :class="log.tipe === 'Masuk' ? 'text-green-600' : 'text-red-600'">
              {{ log.tipe === 'Masuk' ? '+' : '-' }}{{ log.jumlah }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useBarangStore } from "@/stores/barang";
const store = useBarangStore();
</script>