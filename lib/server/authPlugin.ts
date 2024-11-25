import { firebaseAdminAuth } from '@/lib/server/firebaseAdmin'
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export type NextRequestWithUser = NextRequest & {
  $user: { id: string }
}

export async function authPlugin(req: NextRequestWithUser) {
  const idToken = req.headers.get('authorization')

  if (!idToken) {
    return NextResponse.json(
      {
        error: {
          message: 'authorization required',
          statusCode: 401,
        },
      },
      { status: 401 },
    )
  }

  try {
    const decodedToken = await firebaseAdminAuth.verifyIdToken(idToken.slice(7))
    req.$user = { id: decodedToken.uid }
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        error: {
          message: 'invalid token',
          statusCode: 401,
        },
      },
      { status: 401 },
    )
  }

  return NextResponse.next()
}
