import { ref } from 'vue'
import { getOffers, createOffer, deleteOffer, updateOfferStatus } from '@/services/api'

export function useOffers() {
  const offers = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchOffers = async () => {
    loading.value = true
    try {
      const res = await getOffers()
      offers.value = res.data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const addOffer = async (data) => {
    loading.value = true
    try {
      await createOffer(data)
      await fetchOffers()
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const removeOffer = async (id) => {
    loading.value = true
    try {
      await deleteOffer(id)
      offers.value = offers.value.filter((o) => o.id !== id)
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const changeStatus = async (id, status) => {
    loading.value = true
    try {
      await updateOfferStatus(id, status)
      await fetchOffers()
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return { offers, loading, error, fetchOffers, addOffer, removeOffer, changeStatus }
} 