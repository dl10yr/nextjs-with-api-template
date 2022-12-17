'use client'
import { useEffect } from 'react'
import Router from 'next/router'

import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'

import * as gtag from '@/lib/client/gtag'
import { existsGaId, GA_ID } from '@/lib/client/gtag'

import './globals.css'

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
        {existsGaId && (
          <>
            {' '}
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
        )}
      </head>
      <body>
        <Header />
        <main className="bg-blue-100 text-black">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
