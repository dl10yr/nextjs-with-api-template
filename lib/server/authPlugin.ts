import { firebaseAdminAuth } from '@/lib/server/firebaseAdmin'
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function authPlugin(req: NextRequest) {
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
    req.headers.set('user-id', decodedToken.user_id)
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
