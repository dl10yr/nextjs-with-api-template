import type { NextApiResponse } from 'next'

type ApiErrorOption = {
  description: string
  statusCode: number
}

export class ApiError extends Error {
  public readonly statusCode: number
  public readonly descripton: string

  constructor(error: ApiErrorOption) {
    super(error.description)
    this.statusCode = error.statusCode
    this.descripton = error.description
  }
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const apiErrorHandler = (error: any, res: NextApiResponse) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({ description: error.descripton })
  }

  return res
    .status(500)
    .json({ error: { description: 'internal server error', statusCode: 500 } })
}
