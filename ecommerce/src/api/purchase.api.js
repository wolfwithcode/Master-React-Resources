import { statusCart } from 'constants/status'
import http from 'utils/http'

const URL = 'purchases'

const purchaseApi = {
  addToCart(data) {
    return http.post(`${URL}/add-to-cart`, data)
  },
  updatePurchase(data) {
    return http.put(`${URL}/update-purchase`, data)
  },
  deletePurchases(data) {
    return http.delete(`${URL}`, data)
  },
  getCartPurchases() {
    return http.get(URL, {
      params: {
        status: statusCart.inCart
      }
    })
  },
  getPurchases(status) {
    return http.get(URL, {
      params: {
        status
      }
    })
  },
  buyPurchases(data) {
    return http.post(`${URL}/buy-products`, data)
  }
}
export default purchaseApi
