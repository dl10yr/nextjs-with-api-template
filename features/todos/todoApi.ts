import { get } from '@/lib/client/api/apiClient'
import type { Todo } from '@/lib/shared/todo'

export const getTodos = (): Promise<Array<Todo>> => {
  return get('/todos')
}
