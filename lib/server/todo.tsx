import { prisma } from './db'

export const deleteTodo = async (id: string) => {
  await prisma.todo.delete({
    where: {
      id,
    },
  })
}
