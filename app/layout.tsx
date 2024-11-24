'use client'
import { useEffect } from 'react'
import Router from 'next/router'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth'

import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'

import * as gtag from '@/lib/client/gtag'
import { firebaseClientAuth } from '@/lib/client/firebaseClient'
import { currentUserState } from '@/lib/client/atoms/currentUser'

import './globals.css'

const AppInit = () => {
  const setCurrentUser = useSetRecoilState(currentUserState)
  const fetchSetUser = async () => {
    try {
      onAuthStateChanged(firebaseClientAuth, async (user) => {
        if (!user) {
          signInAnonymously(firebaseClientAuth)
            .then(async (e) => {
              if (e.user) {
                setCurrentUser({
                  uid: e.user.uid,
                  displayName: e.user.displayName,
                  isAnonymus: e.user.isAnonymous,
                })
              }
              // eslint-disable-next-line no-console
            })
            .catch(() => {
              // console.log(error)
            })
        } else {
          setCurrentUser({
            uid: user.uid,
            displayName: user.displayName,
            isAnonymus: user.isAnonymous,
          })
        }
      })
    } catch {
      setCurrentUser(null)
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
        <RecoilRoot>
          <AppInit />
          <Header />
          <main className="bg-blue-100 text-black">{children}</main>
          <Footer />
        </RecoilRoot>
      </body>
    </html>
  )
}
