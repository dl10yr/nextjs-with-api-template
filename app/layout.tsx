'use client'
import { useEffect } from 'react'
import Router from 'next/router'
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import { useSetAtom } from 'jotai'
import styles from './layout.module.scss'

import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import { Providers } from '@/components/shared/Providers'


import * as gtag from '@/lib/client/gtag'
import { firebaseClientAuth } from '@/lib/client/firebaseClient'
import { currentUserAtom } from '@/lib/client/atoms/currentUser'

import './globals.css'

const AppInit = () => {
  const setCurrentUser = useSetAtom(currentUserAtom)
  const fetchSetUser = async () => {
    try {
      onAuthStateChanged(firebaseClientAuth, async (user) => {
        if (!user) {
          signInAnonymously(firebaseClientAuth)
            .then(async (e) => {
              if (e.user) {
                setCurrentUser({
                  uid: e.user.uid ?? '',
                  displayName: e.user.displayName,
                  isAnonymous: e.user.isAnonymous,
                })
              }
              // eslint-disable-next-line no-console
            })
            .catch(() => {
              // console.log(error)
            })
        } else {
          setCurrentUser({
            uid: user.uid ?? '',
            displayName: user.displayName,
            isAnonymous: user.isAnonymous,
          })
        }
      })
    } catch {
      setCurrentUser({
        uid: null,
        displayName: null,
        isAnonymous: null,
      })
    }
  }
  useEffect(() => {
    fetchSetUser()
  }, [])
  return null
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!gtag.existsGaId) {
      return
    }

    const handleRouteChange = (path) => {
      gtag.pageview(path)
    }

    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return (
    <html>
      <head>
        {/* Google Analytics */}
        {/* {existsGaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
              });`,
              }}
            />
          </>
        )} */}
      </head>
      <body>
        <Providers>
          <AppInit />
          <Header />
          <main className={styles.container}>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
