import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { LocalStorage } from 'constants/localStorage'
import authApi from 'api/auth.api'
import userApi from 'api/user.api'
import { payloadCreator } from 'utils/helper'

export const register = createAsyncThunk(
  'user/register',
  payloadCreator(authApi.register)
)

export const login = createAsyncThunk(
  'user/login',
  payloadCreator(authApi.login)
)

export const logout = createAsyncThunk(
  'user/logout',
  payloadCreator(authApi.logout)
)

export const getMe = createAsyncThunk(
  'user/getMe',
  payloadCreator(userApi.getMe)
)

export const updateMe = createAsyncThunk(
  'user/updateMe',
  payloadCreator(userApi.updateMe)
)

const haldeAuthFulfilled = (state, action) => {
  const {
    data: { user, access_token }
  } = action.payload
  state.profile = user
  localStorage.setItem(LocalStorage.user, JSON.stringify(state.profile))
  localStorage.setItem(LocalStorage.accessToken, access_token)
}

const handleUnauth = state => {
  state.profile = {}
  localStorage.removeItem(LocalStorage.user)
  localStorage.removeItem(LocalStorage.accessToken)
}

const handleFetchMeFulfilled = (state, action) => {
  state.profile = action.payload.data
  localStorage.setItem(LocalStorage.user, JSON.stringify(state.profile))
}

const user = createSlice({
  name: 'user',
  initialState: {
    profile: JSON.parse(localStorage.getItem(LocalStorage.user)) || {}
  },
  reducers: {
    unauthorize: handleUnauth
  },
  extraReducers: {
    [login.fulfilled]: haldeAuthFulfilled,
    [register.fulfilled]: haldeAuthFulfilled,
    [logout.fulfilled]: handleUnauth,
    [updateMe.fulfilled]: handleFetchMeFulfilled,
    [getMe.fulfilled]: handleFetchMeFulfilled
  }
})

const userReducer = user.reducer
export const unauthorize = user.actions.unauthorize
export default userReducer
