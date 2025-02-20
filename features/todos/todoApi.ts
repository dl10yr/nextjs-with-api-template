import { api } from '@/lib/client/api/apiClient'
import type { PostTodoInput, Todo } from '@/lib/shared/todo'

export const getTodos = async (): Promise<Array<Todo>> => {
  const res = await api.get<{ todos: Array<Todo> }, unknown>('/todos')
  return res.todos
}

export const postTodo = async (postTodoBody: PostTodoInput) => {
  return await api.post<PostTodoInput, Todo, unknown>('/todos', postTodoBody)
}

export const deleteTodo = async (todoId: string): Promise<boolean> => {
  await api.delete<void>(`/todos/${todoId}`)
  return true
}
