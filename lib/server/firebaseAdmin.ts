import * as admin from 'firebase-admin'
import { getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

const apps = getApps()

export const firebaseAdmin =
  apps[0] ??
  initializeApp({
    credential: admin.credential.cert({
      privateKey: process.env.FIREBASE_PRIVATE_KEY ?? ''.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_PROJECT_ID,
    }),
  })

export const firebaseAdminAuth = getAuth()
