<template>
  <div>
    <h2>Yeni Teklif Ekle</h2>

    <form @submit.prevent="addOffer">
      <select v-model="form.customerId" required>
        <option value="" disabled selected>Müşteri Seç</option>
        <option v-for="c in customers" :key="c.id" :value="c.id">
          {{ c.name }}
        </option>
      </select>

      <input v-model="form.title" placeholder="Teklif Başlığı" required />
      <input v-model.number="form.amount" placeholder="Tutar" type="number" required />
      <input v-model="form.offer_date" placeholder="Tarih (YYYY-MM-DD)" required />

      <select v-model="form.status" required>
        <option value="" disabled selected>Durum Seç</option>
        <option>Beklemede</option>
        <option>Kabul Edildi</option>
        <option>Reddedildi</option>
        <option>Teslim Edildi</option>
      </select>

      <textarea v-model="form.notes" placeholder="Notlar (isteğe bağlı)"></textarea>

      <button type="submit">➕ Ekle</button>
    </form>

    <div class="filters">
      <h2>Filtrele</h2>
      <input v-model="filters.search" placeholder="Başlık / Müşteri ara..." />
      <select v-model="filters.status">
        <option value="">Tüm Durumlar</option>
        <option>Beklemede</option>
        <option>Kabul Edildi</option>
        <option>Reddedildi</option>
        <option>Teslim Edildi</option>
      </select>
    </div>

    <h2>Teklif Listesi</h2>
    <ul v-if="filteredOffers.length">
      <li v-for="offer in filteredOffers" :key="offer.id">
        <strong>{{ offer.title }}</strong> – {{ offer.amount }} TL<br />
        Müşteri: {{ offer.customer?.name || 'Tanımsız' }}<br />
        Tarih: {{ offer.offer_date }}

        <div>
          <label>Durum:</label>
          <select v-model="offer.status" @change="updateStatus(offer)">
            <option>Beklemede</option>
            <option>Kabul Edildi</option>
            <option>Reddedildi</option>
            <option>Teslim Edildi</option>
          </select>
        </div>

        <button class="delete" @click="deleteOffer(offer.id)">🗑️ Sil</button>
      </li>
    </ul>
    <p v-else>Henüz teklif bulunmuyor.</p>

    <div class="stats">
      <h3>Teklif Özeti</h3>
      <ul>
        <li>Toplam Teklif: {{ stats.total }}</li>
        <li>Toplam Tutar: {{ stats.totalAmount }} TL</li>
        <li>Kabul Edilen: {{ stats.accepted }}</li>
        <li>Reddedilen: {{ stats.rejected }}</li>
        <li>Teslim Edilen: {{ stats.delivered }}</li>
        <li>Ortalama Tutar: {{ stats.average }} TL</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '../api'

const offers = ref([])
const customers = ref([])

const form = ref({
  customerId: '',
  title: '',
  amount: null,
  status: '',
  offer_date: '',
  notes: '',
})

const filters = ref({
  search: '',
  status: '',
})

const filteredOffers = computed(() => {
  return offers.value.filter((offer) => {
    const query = filters.value.search.toLowerCase()
    const matchesSearch =
      offer.title.toLowerCase().includes(query) ||
      offer.customer?.name?.toLowerCase().includes(query)

    const matchesStatus = filters.value.status
      ? offer.status === filters.value.status
      : true

    return matchesSearch && matchesStatus
  })
})

const stats = computed(() => {
  const total = offers.value.length
  const totalAmount = offers.value.reduce((sum, o) => sum + Number(o.amount), 0)
  const accepted = offers.value.filter((o) => o.status === 'Kabul Edildi').length
  const rejected = offers.value.filter((o) => o.status === 'Reddedildi').length
  const delivered = offers.value.filter((o) => o.status === 'Teslim Edildi').length
  const average = total > 0 ? (totalAmount / total).toFixed(2) : 0

  return { total, totalAmount, accepted, rejected,delivered, average }
})

const getOffers = async () => {
  const res = await api.get('/offers')
  offers.value = res.data
}

const getCustomers = async () => {
  const res = await api.get('/customers')
  customers.value = res.data
}

const addOffer = async () => {
  try {
    await api.post('/offers', form.value)
    form.value = {
      customerId: '',
      title: '',
      amount: null,
      status: '',
      offer_date: '',
      notes: '',
    }
    await getOffers()
  } catch (err) {
    console.error('Teklif eklenemedi:', err)
  }
}

const updateStatus = async (offer) => {
  try {
    await api.patch(`/offers/${offer.id}`, { status: offer.status })
  } catch (err) {
    console.error('Durum güncellenemedi:', err)
  }
}

const deleteOffer = async (id) => {
  try {
    await api.delete(`/offers/${id}`)
    offers.value = offers.value.filter((o) => o.id !== id)
  } catch (err) {
    console.error('Silme hatası:', err)
  }
}

onMounted(() => {
  getOffers()
  getCustomers()
})
</script>

<style scoped>
div {
  font-family: 'Segoe UI', sans-serif;
  padding: 1rem;
  max-width: 700px;
  margin: auto;
}

h2 {
  margin-top: 1.5rem;
  margin-bottom: 0.8rem;
  font-size: 1.4rem;
  color: #333;
}

form {
  background: #f4f4f4;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

form input,
form select,
form textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

form button {
  background-color: #007bff;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}
form button:hover {
  background-color: #0056b3;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: #f9f9f9;
  margin-bottom: 12px;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #007bff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

li strong {
  font-size: 1.1rem;
}

li label {
  margin-right: 8px;
}

button.delete {
  background: #dc3545;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
button.delete:hover {
  background: #c82333;
}

.stats,
.filters {
  background: #f2f2f2;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
}

.filters input,
.filters select {
  margin-top: 5px;
  width: 100%;
  padding: 8px;
}

.stats ul {
  list-style: none;
  padding: 0;
  margin-top: 0.5rem;
}

.stats li {
  margin-bottom: 6px;
}
</style>
