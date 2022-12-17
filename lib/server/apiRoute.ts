import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { firebaseAdminAuth } from './firebaseAdmin'
import { apiErrorHandler } from './error'

const HttpMethod = {
  Get: 'GET',
  Post: 'POST',
  Put: 'PUT',
  Patch: 'PATCH',
  Delete: 'DELETE',
} as const
export type HttpMethod = typeof HttpMethod[keyof typeof HttpMethod]

type Handlers = {
  [key in HttpMethod]?: NextApiHandler
}

export type NextApiRequestWithUser = NextApiRequest & {
  user: { id: string }
}

export const apiRoute = (handlers: Handlers) => {
  return async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    const { method } = req

    try {
      const idToken = req.headers.authorization
      const decodedToken = await firebaseAdminAuth.verifyIdToken(idToken.slice(7))
      req.user = { id: decodedToken.user_id }
    } catch (error) {
      console.error(error)
      return res.status(401).json({
        error: {
          message: 'authorization required',
          statusCode: 401,
        },
      })
    }

    const handler = handlers[method]
    if (!handler) {
      return res.status(405).json({
        error: {
          message: `method ${req.method} not allowed`,
          statusCode: 405,
        },
      })
    }

    try {
      await handler(req, res)
    } catch (err) {
      apiErrorHandler(err, res)
    }
  }
}
