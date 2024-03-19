import axios from "axios"

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
})

export const profileAPI = {
  getProfile(userId) {
    return instance
      .get(`profile/${userId}`)
      .then(response => response.data)
  },
  getStatus(userId) {
    return instance
      .get('profile/status/' + userId)
  },
  updateStatus(status) {
    return instance
      .put('profile/status', { status: status })
  }
}

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 100) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => response.data)
  },
  getProfile(userId) {
    console.warn('Obsolete method, please use profileAPI object')
    return profileAPI.getProfile(userId)
  },
  follow(userId) {
    return instance
      .post(`follow/${userId}`)
      .then(response => response.data)
  },
  unfollow(userId) {
    return instance
      .delete('follow/' + userId)
      .then(response => response.data)
  },
}

export const authAPI = {
  me() {
    return instance
      .get("auth/me")
  },
  login(email, password, rememberMe = false) {
    return instance
      .post('auth/login', { email, password, rememberMe })
  },
  logout() {
    return instance
      .delete('auth/login')
  },
}