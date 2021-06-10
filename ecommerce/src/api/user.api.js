import http from 'utils/http'

const URL = 'user'

const userApi = {
  getMe() {
    return http.get(`${URL}`)
  },
  updateMe(data) {
    return http.put(`${URL}`, data)
  }
}

export default userApi
