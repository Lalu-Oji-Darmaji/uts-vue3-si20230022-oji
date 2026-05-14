<template>
  <div class="min-h-screen bg-slate-50 flex flex-col items-center p-10 font-sans">
    <div class="w-full max-w-2xl mb-8 border-b-2 border-indigo-100 pb-5 flex justify-between items-center">
      <div>
        <h1 class="text-blue-900 text-2xl font-extrabold tracking-tight uppercase">Tambah Barang Baru</h1>
      </div>
      <RouterLink to="/barang"
        class="text-black bg-red-500 hover:bg-red-400 hover:text-white text-sm rounded p-2 font-semibold">
        Kembali
      </RouterLink>
    </div>
    <form @submit.prevent="simpan" class="bg-white p-8 rounded-xl shadow-sm border border-slate-200 w-full max-w-2xl">

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-bold text-blue-900 uppercase tracking-wide">Nama Barang</label>
          <input v-model="form.nama" type="text"
            class="p-3 border rounded-lg outline-none transition-all focus:ring-2 focus:ring-blue-500"
            :class="form.nama.length > 0 && form.nama.length < 5 ? 'border-red-400' : 'border-slate-300'"
            placeholder="Masukan Nama barang" />
          <div class="flex justify-between text-[10px] uppercase font-bold tracking-tighter">
            <span :class="form.nama.length >= 5 ? 'text-green-500' : 'text-slate-400'">Min. 5 Karakter</span>
            <span class="text-slate-400">{{ form.nama.length }}/25</span>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm font-bold text-blue-900 uppercase tracking-wide">Kategori</label>
          <select v-model="form.kategori"
            class="p-3 border border-slate-300 rounded-lg outline-none bg-white focus:ring-2 focus:ring-blue-500 cursor-pointer text-slate-700">
            <option value="">-- Pilih Kategori --</option>
            <option v-for="kat in daftarKategori" :key="kat" :value="kat">
              {{ kat }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex flex-col gap-2 mb-8">
        <label class="text-sm font-bold text-blue-900 uppercase tracking-wide">Deskripsi Barang</label>
        <textarea v-model="form.deskripsi" rows="4" placeholder="Jelaskan detail spesifikasi atau kondisi barang..."
          class="p-4 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
        <div class="text-[10px] uppercase font-bold tracking-tighter"
          :class="form.deskripsi.length >= 15 ? 'text-green-500' : 'text-slate-400'">
          Min. 15 Karakter (Saat ini: {{ form.deskripsi.length }})
        </div>
      </div>
      <div v-if="form.nama || form.kategori" class="mb-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
        <h4 class="text-xs font-black text-blue-800 uppercase mb-2">Live Preview:</h4>
        <p class="text-slate-800 font-bold text-lg leading-tight">{{ form.nama || 'Nama Barang...' }}</p>
        <span class="inline-block mt-2 px-2 py-0.5 bg-blue-200 text-blue-800 text-[10px] font-bold rounded uppercase">
          {{ form.kategori || 'Belum Pilih Kategori' }}
        </span>
      </div>
      <button type="submit" :disabled="!isFormValid"
        class="w-full py-4 rounded-lg font-bold text-white transition-all shadow-lg flex justify-center items-center gap-2"
        :class="isFormValid ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200 cursor-pointer' : 'bg-slate-300 cursor-not-allowed'">
        <span v-if="!isLoading">Konfirmasi & Simpan Barang</span>
        <span v-else class="animate-spin text-xl">⏳</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, computed, ref } from "vue";
import { useBarangStore } from "@/stores/barang";
import { useRouter } from "vue-router";

const store = useBarangStore();
const router = useRouter();
const isLoading = ref(false);

const form = reactive({
  nama: "",
  deskripsi: "",
  kategori: "",
});

const daftarKategori = ["Elektronik", "Fashion", "Kosmetik"];

const isFormValid = computed(() => {
  return form.nama.trim().length >= 5 && form.kategori !== "" && form.deskripsi.trim().length >= 15;
});

async function simpan() {
  isLoading.value = true;

  try {
    await new Promise(r => setTimeout(r, 500));
    store.tambahBarang({
      nama: form.nama,
      deskripsi: form.deskripsi,
      kategori: form.kategori,
      stok: 0
    });

    alert("Barang berhasil ditambahkan!");
    router.push("/barang");
  } catch (error) {
    alert("Gagal menyimpan data.");
  } finally {
    isLoading.value = false;
  }
}
</script>