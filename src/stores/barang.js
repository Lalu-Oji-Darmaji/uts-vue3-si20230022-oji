import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useBarangStore = defineStore('barang', () => {
    const daftarBarang = ref([])
    const barangTerpilih = ref(null)
    const isLoading = ref(false)
    const error = ref(null)
    const riwayat = ref([])
    const filter = ref({
        search: '',
        kategori: '',
    })
    const pagination = ref({
        page: 1,
        perPage: 12,
        total: 0,
    })

    function catatTransaksi(namaBarang, kategori) {
        riwayat.value.unshift({
            id: Date.now(),
            nama: namaBarang,
            kategori: kategori,
        })
    }
    const barangTerfilter = computed(() => {
        let hasil = [...daftarBarang.value]

        if (filter.value.search) {
            const q = filter.value.search.toLowerCase()
            hasil = hasil.filter(b =>
                b.nama.toLowerCase().includes(q) ||
                (b.deskripsi || '').toLowerCase().includes(q)
            )
        }

        if (filter.value.kategori) {
            hasil = hasil.filter(
                b => b.kategori === filter.value.kategori
            )
        }

        return hasil
    })

    const barangDipaginasi = computed(() => {
        const start = (pagination.value.page - 1) * pagination.value.perPage
        const end = start + pagination.value.perPage
        return barangTerfilter.value.slice(start, end)
    })

    const daftarKategori = computed(() =>
        [...new Set(daftarBarang.value.map(b => b.kategori))].sort()
    )

    const infoHasil = computed(() => {
        return `Menampilkan ${barangTerfilter.value.length} barang`
    })

    const statistik = computed(() => ({
        totalBarang: daftarBarang.value.length,
        totalStok: daftarBarang.value.reduce((t, b) => t + (b.stok || 0), 0),
        totalKategori: daftarKategori.value.length,
    }))

    async function ambilSemuaBarang() {
        isLoading.value = true
        error.value = null
        try {
            await new Promise(r => setTimeout(r, 600))
            daftarBarang.value = [...dataBarangSementara]
            pagination.value.total = dataBarangSementara.length
        } catch (e) {
            error.value = 'Gagal memuat data barang'
        } finally {
            isLoading.value = false
        }
    }

    async function ambilBarangById(id) {
        isLoading.value = true
        try {
            await new Promise(r => setTimeout(r, 400))
            barangTerpilih.value = daftarBarang.value.find(b => b.id === Number(id)) || null
        } finally {
            isLoading.value = false
        }
    }

    function tambahBarang(dataBarang) {
        const barangBaru = {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            ...dataBarang,
        }
        daftarBarang.value.unshift(barangBaru)
        pagination.value.total = daftarBarang.value.length
        return barangBaru
    }

    function updateBarang(id, dataUpdate) {
        const idx = daftarBarang.value.findIndex(b => b.id === Number(id))
        if (idx !== -1) {
            daftarBarang.value[idx] = { ...daftarBarang.value[idx], ...dataUpdate }
        }
    }

    function hapusBarang(id) {
        daftarBarang.value = daftarBarang.value.filter(b => b.id !== id)
        pagination.value.total = daftarBarang.value.length
    }

    function resetFilter() {
        filter.value.search = ''
        filter.value.kategori = ''
        pagination.value.page = 1
    }

    return {
        daftarBarang, barangTerpilih, isLoading, error, filter, pagination,
        barangTerfilter, barangDipaginasi, daftarKategori, statistik, infoHasil,riwayat,
        ambilSemuaBarang, ambilBarangById, tambahBarang, updateBarang, hapusBarang, resetFilter, catatTransaksi
    }
})
const dataBarangSementara = [
    { id: 1, nama: "Laptop Lenovo", kategori: "Elektronik", deskripsi: "Laptop untuk kebutuhan kerja.", stok: 100 },
    { id: 2, nama: "Smartphone Samsung", kategori: "Elektronik", deskripsi: "Smartphone Android kamera tinggi.", stok: 75 },
    { id: 3, nama: "Headset Bluetooth", kategori: "Elektronik", deskripsi: "Headset nirkabel suara jernih.", stok: 50 },
    { id: 4, nama: "Smart TV LG", kategori: "Elektronik", deskripsi: "Televisi pintar resolusi 4K.", stok: 25 },
    { id: 5, nama: "Keyboard Mechanical", kategori: "Elektronik", deskripsi: "Keyboard gaming RGB.", stok: 40 },
    { id: 6, nama: "Mouse Wireless", kategori: "Elektronik", deskripsi: "Mouse ergonomis tanpa kabel.", stok: 65 },
    { id: 7, nama: "Power Bank", kategori: "Elektronik", deskripsi: "Power bank pengisian cepat.", stok: 90 },
    { id: 8, nama: "Lipstik Matte", kategori: "Kosmetik", deskripsi: "Lipstik warna tahan lama.", stok: 120 },
    { id: 9, nama: "Facial Wash", kategori: "Kosmetik", deskripsi: "Sabun pembersih wajah segar.", stok: 90 },
    { id: 10, nama: "Parfum Wanita", kategori: "Kosmetik", deskripsi: "Parfum aroma floral elegan.", stok: 40 },
    { id: 11, nama: "Serum Wajah", kategori: "Kosmetik", deskripsi: "Serum kesehatan kulit.", stok: 70 },
    { id: 12, nama: "Bedak Compact", kategori: "Kosmetik", deskripsi: "Bedak hasil natural.", stok: 85 },
    { id: 13, nama: "Masker Wajah", kategori: "Kosmetik", deskripsi: "Masker perawatan harian.", stok: 110 },
    { id: 14, nama: "Sunscreen SPF 50", kategori: "Kosmetik", deskripsi: "Pelindung dari sinar UV.", stok: 95 },
    { id: 15, nama: "Kaos Oversize", kategori: "Fashion", deskripsi: "Kaos casual katun nyaman.", stok: 150 },
    { id: 16, nama: "Jaket Hoodie", kategori: "Fashion", deskripsi: "Jaket hoodie desain modern.", stok: 60 },
    { id: 17, nama: "Celana Jeans", kategori: "Fashion", deskripsi: "Celana jeans slim fit.", stok: 80 },
    { id: 18, nama: "Sepatu Sneakers", kategori: "Fashion", deskripsi: "Sneakers trendy nyaman.", stok: 55 },
    { id: 19, nama: "Tas Ransel", kategori: "Fashion", deskripsi: "Tas multifungsi sekolah/kerja.", stok: 45 },
    { id: 20, nama: "Topi Baseball", kategori: "Fashion", deskripsi: "Topi casual desain sporty.", stok: 70 },
]