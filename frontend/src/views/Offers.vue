<template>
  <div class="container">
    <el-card class="box-card">
      <h2>Yeni Teklif Ekle</h2>
      <vee-form :validation-schema="schema" @submit="onSubmit">
        <el-row :gutter="12">
          <el-col :xs="24" :sm="12">
            <vee-field name="customerId" v-slot="{ field, errorMessage }">
              <el-form-item label="Müşteri" :error="errorMessage">
                <el-select
                  :model-value="field.value"
                  @update:model-value="field.onChange"
                  placeholder="Müşteri Seç"
                  filterable
                >
                  <el-option v-for="c in customers" :key="c.id" :label="c.name" :value="c.id" />
                </el-select>
              </el-form-item>
            </vee-field>
          </el-col>
          <el-col :xs="24" :sm="12">
            <vee-field name="title" v-slot="{ field, errorMessage }">
              <el-form-item label="Teklif Başlığı" :error="errorMessage">
                <el-input
                  :model-value="field.value"
                  @update:model-value="field.onChange"
                  placeholder="Teklif Başlığı"
                />
              </el-form-item>
            </vee-field>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :xs="24" :sm="8">
            <vee-field name="amount" v-slot="{ field, errorMessage }">
              <el-form-item label="Tutar" :error="errorMessage">
                <el-input
                  :model-value="field.value"
                  @update:model-value="field.onChange"
                  type="number"
                  placeholder="Tutar"
                />
              </el-form-item>
            </vee-field>
          </el-col>
          <el-col :xs="24" :sm="8">
            <vee-field name="offer_date" v-slot="{ field, errorMessage }">
              <el-form-item label="Tarih" :error="errorMessage">
                <el-date-picker
                  :model-value="field.value"
                  @update:model-value="field.onChange"
                  type="date"
                  placeholder="Tarih"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                />
              </el-form-item>
            </vee-field>
          </el-col>
          <el-col :xs="24" :sm="8">
            <vee-field name="status" v-slot="{ field, errorMessage }">
              <el-form-item label="Durum" :error="errorMessage">
                <el-select
                  :model-value="field.value"
                  @update:model-value="field.onChange"
                  placeholder="Durum Seç"
                >
                  <el-option label="Beklemede" value="Beklemede" />
                  <el-option label="Kabul Edildi" value="Kabul Edildi" />
                  <el-option label="Reddedildi" value="Reddedildi" />
                  <el-option label="Teslim Edildi" value="Teslim Edildi" />
                </el-select>
              </el-form-item>
            </vee-field>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <vee-field name="notes" v-slot="{ field, errorMessage }">
              <el-form-item label="Notlar" :error="errorMessage">
                <el-input
                  :model-value="field.value"
                  @update:model-value="field.onChange"
                  type="textarea"
                  placeholder="Notlar (isteğe bağlı)"
                />
              </el-form-item>
            </vee-field>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" native-type="submit" :loading="loading">Ekle</el-button>
        </el-form-item>
      </vee-form>
      <el-divider />
      <el-row :gutter="12" class="filters">
        <el-col :xs="24" :sm="12">
          <el-input v-model="filters.search" placeholder="Başlık / Müşteri ara..." clearable />
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-select v-model="filters.status" placeholder="Durum Seç" clearable>
            <el-option label="Tüm Durumlar" value="" />
            <el-option label="Beklemede" value="Beklemede" />
            <el-option label="Kabul Edildi" value="Kabul Edildi" />
            <el-option label="Reddedildi" value="Reddedildi" />
            <el-option label="Teslim Edildi" value="Teslim Edildi" />
          </el-select>
        </el-col>
      </el-row>
      <el-skeleton v-if="loading" :rows="6" animated />
      <el-table v-else :data="filteredOffers" style="width: 100%; margin-top: 1rem;">
        <el-table-column prop="title" label="Başlık" />
        <el-table-column prop="amount" label="Tutar (TL)" />
        <el-table-column prop="customer.name" label="Müşteri" />
        <el-table-column prop="offer_date" label="Tarih" />
        <el-table-column prop="status" label="Durum">
          <template #default="scope">
            <el-select v-model="scope.row.status" @change="handleChangeStatus(scope.row)" size="small">
              <el-option label="Beklemede" value="Beklemede" />
              <el-option label="Kabul Edildi" value="Kabul Edildi" />
              <el-option label="Reddedildi" value="Reddedildi" />
              <el-option label="Teslim Edildi" value="Teslim Edildi" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="İşlem">
          <template #default="scope">
            <el-button type="danger" size="small" @click="remove(scope.row.id)">Sil</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-empty v-if="!filteredOffers.length && !loading" description="Teklif bulunamadı." />
      <el-divider />
      <el-card class="stats">
        <h3>Teklif Özeti</h3>
        <el-row>
          <el-col :span="8">Toplam Teklif: {{ stats.total }}</el-col>
          <el-col :span="8">Toplam Tutar: {{ stats.totalAmount }} TL</el-col>
          <el-col :span="8">Ortalama Tutar: {{ stats.average }} TL</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">Kabul Edilen: {{ stats.accepted }}</el-col>
          <el-col :span="8">Reddedilen: {{ stats.rejected }}</el-col>
          <el-col :span="8">Teslim Edilen: {{ stats.delivered }}</el-col>
        </el-row>
      </el-card>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useOffers } from '@/composables/useOffers'
import { useCustomers } from '@/composables/useCustomers'
import { ElNotification } from 'element-plus'
import { Form as VeeForm, Field as VeeField } from 'vee-validate'
import * as yup from 'yup'

const filters = ref({ search: '', status: '' })
const schema = yup.object({
  customerId: yup.number().required('Müşteri seçin'),
  title: yup.string().required('Başlık zorunlu'),
  amount: yup.number().typeError('Tutar zorunlu ve sayı olmalı').required('Tutar zorunlu'),
  status: yup.string().required('Durum zorunlu'),
  offer_date: yup.string().required('Tarih zorunlu'),
  notes: yup.string(),
})

const { offers, loading, error, fetchOffers, addOffer, removeOffer, changeStatus } = useOffers()
const { customers, fetchCustomers } = useCustomers()

const filteredOffers = computed(() => {
  const query = filters.value.search.toLowerCase()
  return offers.value.filter((offer) => {
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
  return { total, totalAmount, accepted, rejected, delivered, average }
})

const onSubmit = async (values, { resetForm }) => {
  // customerId ve amount'u number'a çevir
  values.customerId = Number(values.customerId)
  values.amount = Number(values.amount)
  await addOffer(values)
  if (!error.value) {
    ElNotification({ title: 'Başarılı', message: 'Teklif eklendi', type: 'success' })
    resetForm()
  } else {
    ElNotification({ title: 'Hata', message: 'Teklif eklenemedi', type: 'error' })
  }
}

const remove = async (id) => {
  await removeOffer(id)
  if (!error.value) {
    ElNotification({ title: 'Başarılı', message: 'Teklif silindi', type: 'success' })
  } else {
    ElNotification({ title: 'Hata', message: 'Teklif silinemedi', type: 'error' })
  }
}

const handleChangeStatus = async (row) => {
  await changeStatus(row.id, row.status)
  if (!error.value) {
    ElNotification({ title: 'Başarılı', message: 'Durum güncellendi', type: 'success' })
  } else {
    ElNotification({ title: 'Hata', message: 'Durum güncellenemedi', type: 'error' })
  }
}

onMounted(() => {
  fetchOffers()
  fetchCustomers()
})
</script>

<style scoped>
.container {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 1rem;
}
.box-card {
  padding: 1.5rem 1rem;
}
.stats {
  margin-top: 2rem;
}
@media (max-width: 600px) {
  .container {
    padding: 0.5rem;
  }
  .box-card {
    padding: 0.5rem;
  }
}
</style>
