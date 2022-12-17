import { NextApiHandler, NextApiResponse } from 'next'

import { apiRoute, NextApiRequestWithUser } from '@/lib/server/apiRoute'
import { deleteTodo } from '@/lib/server/todo'

const deleteHandler: NextApiHandler = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  const {
    query: { id },
  } = req

  await deleteTodo(id as string)

  res.status(204).end()
}

export default apiRoute({
  DELETE: deleteHandler,
})
