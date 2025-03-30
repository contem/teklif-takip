<template>
  <div class="container">
    <h2>Müşteriler</h2>

    <form class="form" @submit.prevent="addCustomer">
      <input v-model="form.name" placeholder="Ad Soyad" required />
      <input v-model="form.company" placeholder="Firma Adı" />
      <input v-model="form.phone" placeholder="Telefon" />
      <input v-model="form.email" placeholder="E-posta" />
      <button type="submit">➕ Ekle</button>
    </form>

    <input
      v-model="filter"
      placeholder="Müşteri ara (isim, firma, mail...)"
      class="filter-input"
    />

    <div class="customer-list" v-if="filteredCustomers.length">
      <div class="customer-card" v-for="customer in filteredCustomers" :key="customer.id">
        <strong>{{ customer.name }}</strong>
        <p>{{ customer.company }}</p>
        <p><small>{{ customer.email }}</small></p>
        <p><small>{{ customer.phone }}</small></p>
        <button class="delete-btn" @click="deleteCustomer(customer.id)">🗑️ Sil</button>
      </div>
    </div>

    <p v-else>Aradığınız kritere uygun kayıt bulunamadı.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '../api'

const customers = ref([])
const filter = ref('')

const form = ref({
  name: '',
  company: '',
  phone: '',
  email: '',
})

const getCustomers = async () => {
  const res = await api.get('/customers')
  customers.value = res.data
}

const deleteCustomer = async (id) => {
  try {
    await api.delete(`/customers/${id}`)
    customers.value = customers.value.filter((c) => c.id !== id)
  } catch (err) {
    console.error('Müşteri silinemedi:', err)
  }
}

const addCustomer = async () => {
  try {
    await api.post('/customers', form.value)
    form.value = { name: '', company: '', phone: '', email: '' }
    await getCustomers()
  } catch (err) {
    console.error('Ekleme hatası:', err)
  }
}

const filteredCustomers = computed(() => {
  return customers.value.filter((c) => {
    const query = filter.value.toLowerCase()
    return (
      c.name.toLowerCase().includes(query) ||
      c.company?.toLowerCase().includes(query) ||
      c.email?.toLowerCase().includes(query) ||
      c.phone?.toLowerCase().includes(query)
    )
  })
})

onMounted(getCustomers)
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Segoe UI', sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.form input {
  display: block;
  width: 100%;
  margin-bottom: 8px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.form button {
  padding: 10px 20px;
  background: #007bff;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
}
.form button:hover {
  background: #0056b3;
}

.filter-input {
  margin: 1rem 0;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
}

.customer-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 1rem;
}

.customer-card {
  background: #f8f9fa;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.customer-card p {
  margin: 4px 0;
}

.delete-btn {
  margin-top: 8px;
  padding: 6px 12px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.delete-btn:hover {
  background: #c82333;
}
</style>
