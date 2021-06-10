import { createReducer } from '@reduxjs/toolkit'

const initialState = {
  loading: 0,
  status: 200
}

const appReducer = createReducer(initialState, builder => {
  builder
    .addMatcher(
      action => action.type.endsWith('/pending'),
      state => {
        state.loading = state.loading + 1
      }
    )
    .addMatcher(
      action =>
        action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'),
      (state, action) => {
        state.status = action.payload.status
        state.loading = state.loading - 1
      }
    )
})

export default appReducer
