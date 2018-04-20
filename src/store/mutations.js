import {
  STORE_BRANDS
} from './mutation_type'

export default {
  [STORE_BRANDS] (state, brands) {
    state.brands = brands
  }
}
