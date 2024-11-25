import type { PostTodoInput, Todo } from '@/lib/shared/todo'
import { axiosInstance } from './index'

export const getTodos = async (): Promise<Array<Todo>> => {
  const { data } = await axiosInstance.get<{ todos: Array<Todo> }>('/todos')
  return data.todos
}

export const postTodo = async (postTodoBody: PostTodoInput) => {
  const { data } = await axiosInstance.post<Todo>('/todos', postTodoBody)
  return data
}

export const deleteTodo = async (todoId: string): Promise<boolean> => {
  await axiosInstance.delete<void>(`/todos/${todoId}`)
  return true
}
