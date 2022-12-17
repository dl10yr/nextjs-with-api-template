import axios from 'axios'
import { firebaseClientAuth } from '../firebaseClient'

import * as todoApi from './todos'

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(async (config) => {
  config.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000/api'

  const idToken = await firebaseClientAuth.currentUser.getIdToken()

  config.headers = {
    ...config.headers,
    // eslint-disable-next-line prettier/prettier
    Authorization: `Bearer ${idToken}`,
  }
  return config
})

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error(err)
    return null
  }
)

export { axiosInstance, todoApi }
