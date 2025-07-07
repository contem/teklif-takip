import { ref } from 'vue'
import { getCustomers, createCustomer, deleteCustomer } from '@/services/api'

export function useCustomers() {
  const customers = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchCustomers = async () => {
    loading.value = true
    try {
      const res = await getCustomers()
      customers.value = res.data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const addCustomer = async (data) => {
    loading.value = true
    try {
      await createCustomer(data)
      await fetchCustomers()
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const removeCustomer = async (id) => {
    loading.value = true
    try {
      await deleteCustomer(id)
      customers.value = customers.value.filter((c) => c.id !== id)
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return { customers, loading, error, fetchCustomers, addCustomer, removeCustomer }
} 