import type { User } from './user'

export type Todo = {
  id: string
  name: string
  content: string
  user: User
}

export type PostTodoInput = {
  name: string
  content: string
}

export type UpdateTodoInput = {
  name: string
  content: string
}
