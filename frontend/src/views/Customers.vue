<template>
  <div class="container">
    <el-card class="box-card">
      <h2>Müşteriler</h2>
      <vee-form :validation-schema="schema" @submit="onSubmit">
        <el-row :gutter="12">
          <el-col :xs="24" :sm="12">
            <vee-field name="name" v-slot="{ field, errorMessage }">
              <el-form-item label="Ad Soyad" :error="errorMessage">
                <el-input
                  :model-value="field.value"
                  @update:model-value="field.onChange"
                  placeholder="Ad Soyad"
                />
              </el-form-item>
            </vee-field>
          </el-col>
          <el-col :xs="24" :sm="12">
            <vee-field name="company" v-slot="{ field, errorMessage }">
              <el-form-item label="Firma Adı" :error="errorMessage">
                <el-input
                  :model-value="field.value"
                  @update:model-value="field.onChange"
                  placeholder="Firma Adı"
                />
              </el-form-item>
            </vee-field>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :xs="24" :sm="12">
            <vee-field name="phone" v-slot="{ field, errorMessage }">
              <el-form-item label="Telefon" :error="errorMessage">
                <el-input
                  :model-value="field.value"
                  @update:model-value="field.onChange"
                  placeholder="Telefon"
                />
              </el-form-item>
            </vee-field>
          </el-col>
          <el-col :xs="24" :sm="12">
            <vee-field name="email" v-slot="{ field, errorMessage }">
              <el-form-item label="E-posta" :error="errorMessage">
                <el-input
                  :model-value="field.value"
                  @update:model-value="field.onChange"
                  placeholder="E-posta"
                />
              </el-form-item>
            </vee-field>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" native-type="submit" :loading="loading">Ekle</el-button>
        </el-form-item>
      </vee-form>
      <el-input v-model="filter" placeholder="Müşteri ara (isim, firma, mail...)" class="filter-input" clearable style="margin: 1rem 0;" />
      <el-skeleton v-if="loading" :rows="4" animated />
      <el-row v-else :gutter="12">
        <el-col v-for="customer in filteredCustomers" :key="customer.id" :xs="24" :sm="12">
          <el-card class="customer-card">
            <div class="card-content">
              <p><strong>{{ customer.name }}</strong></p>
              <p>{{ customer.company }}</p>
              <p><small>{{ customer.email }}</small></p>
              <p><small>{{ customer.phone }}</small></p>
              <el-button type="danger" size="small" @click="remove(customer.id)">Sil</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-empty v-if="!filteredCustomers.length && !loading" description="Kayıt bulunamadı." />
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCustomers } from '@/composables/useCustomers'
import { ElNotification } from 'element-plus'
import { Form as VeeForm, Field as VeeField } from 'vee-validate'
import * as yup from 'yup'

const filter = ref('')
const schema = yup.object({
  name: yup.string().required('Ad zorunlu'),
  company: yup.string().required('Firma zorunlu'),
  phone: yup.string(),
  email: yup.string().email('Geçerli e-posta girin'),
})

const { customers, loading, error, fetchCustomers, addCustomer, removeCustomer } = useCustomers()

const filteredCustomers = computed(() => {
  const query = filter.value.toLowerCase()
  return customers.value.filter((c) =>
    c.name.toLowerCase().includes(query) ||
    c.company?.toLowerCase().includes(query) ||
    c.email?.toLowerCase().includes(query) ||
    c.phone?.toLowerCase().includes(query)
  )
})

const onSubmit = async (values, { resetForm }) => {
  await addCustomer(values)
  if (!error.value) {
    ElNotification({ title: 'Başarılı', message: 'Müşteri eklendi', type: 'success' })
    resetForm()
  } else {
    ElNotification({ title: 'Hata', message: 'Müşteri eklenemedi', type: 'error' })
  }
}

const remove = async (id) => {
  await removeCustomer(id)
  if (!error.value) {
    ElNotification({ title: 'Başarılı', message: 'Müşteri silindi', type: 'success' })
  } else {
    ElNotification({ title: 'Hata', message: 'Müşteri silinemedi', type: 'error' })
  }
}

onMounted(fetchCustomers)
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}
.box-card {
  padding: 1.5rem 1rem;
}
.customer-card {
  margin-bottom: 1rem;
}
.card-content {
  display: flex;
  flex-direction: column;
  gap: 0.05rem;
}
.customer-card p {
  margin: 0 0 0.5rem 0;
  padding: 0;
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
