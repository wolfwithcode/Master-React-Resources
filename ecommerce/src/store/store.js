import rootReducer from 'reducer/reducer'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import loadingMiddleware from 'middleware/authorized.middleware'

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [
    ...getDefaultMiddleware({ serializableCheck: false }),
    loadingMiddleware
  ]
})
export default store
