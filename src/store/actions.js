import api from '@/api'
import {
  STORE_BRANDS
} from './mutation_type'

export default {
  async getBrand ({ commit }) {
    const brands = await api.brand()
    commit(STORE_BRANDS, brands)
  }
}
