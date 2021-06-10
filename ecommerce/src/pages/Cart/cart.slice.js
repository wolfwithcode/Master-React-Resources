import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import purchaseApi from 'api/purchase.api'
import { logout } from 'pages/Auth/user.slice'
import { payloadCreator } from 'utils/helper'

export const getCartPurchases = createAsyncThunk(
  'cart/getCartPurchases',
  payloadCreator(purchaseApi.getCartPurchases)
)

const cart = createSlice({
  name: 'cart',
  initialState: {
    purchases: []
  },
  reducers: {},
  extraReducers: {
    [getCartPurchases.fulfilled]: (state, action) => {
      state.purchases = action.payload.data
    },
    [logout.fulfilled]: state => {
      state.purchases = []
    }
  }
})

const cartReducer = cart.reducer
export default cartReducer
