import axios from 'axios'
import { firebaseClientAuth } from '../firebaseClient'

import * as todoApi from './todos'

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(async config => {
  config.baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000/api'

  const currentUser = firebaseClientAuth.currentUser
  if (!currentUser) {
    throw new Error('User is not authenticated')
  }
  const idToken = await currentUser.getIdToken()

  config.headers.set('Authorization', `Bearer ${idToken}`)
  return config
})

axiosInstance.interceptors.response.use(
  res => res,
  err => {
    console.error(err)
    return null
  },
)

export { axiosInstance, todoApi }
