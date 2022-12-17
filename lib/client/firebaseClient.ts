import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const CLIENT_CONFIG = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
}

export const firebaseClientApp = initializeApp(CLIENT_CONFIG)
export const firebaseClientAuth = getAuth(firebaseClientApp)
