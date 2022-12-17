import { NextApiHandler } from 'next'
import { ulid } from 'ulid'

import { apiRoute, NextApiRequestWithUser } from '@/lib/server/apiRoute'
import { prisma } from '@/lib/server/db'

const getHandler: NextApiHandler = async (req, res) => {
  res.status(200).json('ok')
}

const postHandler: NextApiHandler = async (req: NextApiRequestWithUser, res) => {
  const { body } = req
  const { name, content } = body

  const id = ulid()
  const userId = req.user.id

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
  if (!user) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, created] = await prisma.$transaction([
      prisma.user.create({
        data: {
          id: userId,
        },
      }),
      prisma.todo.create({
        data: {
          id,
          name,
          content,
          userId,
        },
      }),
    ])
    res.status(201).json(created)
    return
  }

  const created = await prisma.todo.create({
    data: {
      id,
      name,
      content,
      userId,
    },
  })

  res.status(201).json(created)
}

export default apiRoute({
  GET: getHandler,
  POST: postHandler,
})
