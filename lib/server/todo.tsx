import type { Todo } from '../shared/todo'
import { prisma } from './db'

export const getTodos = async (): Promise<Array<Todo>> => {
  const todos = await prisma.todo.findMany({
    include: {
      user: true,
    },
  })
  return todos
}

export const deleteTodo = async (id: string): Promise<boolean> => {
  await prisma.todo.delete({
    where: {
      id,
    },
  })
  return true
}
