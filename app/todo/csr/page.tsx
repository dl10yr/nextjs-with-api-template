'use client'
import { useEffect, useState } from 'react'

import { Button } from '@/components/shared/Button'
import TodoForm from '@/components/todo/TodoForm'

import { deleteTodo, getTodos } from '@/lib/client/api/todos'
import { Todo } from '@/lib/shared/todo'

export default function Page() {
  const [todos, setTodos] = useState<Array<Todo>>([])

  const fetchTodos = async () => {
    setTodos(await getTodos())
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const clickDeleteButton = async (id: string) => {
    await deleteTodo(id)
    await fetchTodos()
  }

  const onCreateTodo = async () => {
    await fetchTodos()
  }

  return (
    <div className="w-full">
      <section className="p-2 max-w-screen-sm m-auto">
        <TodoForm onCreateTodo={onCreateTodo} />
      </section>
      <section className="p-3 max-w-screen-sm m-auto">
        <h3 className="text-2xl font-bold m-2 text-center">ToDoリスト（CSR）</h3>
        <ul className="m-3">
          {todos.map((todo: Todo, index: number) => {
            return (
              <li key={index} className="m-3 p-3 bg-white rounded">
                <div>
                  <div className="font-bold">{todo.name}</div>
                  <div className="mt-3 break-words">{todo.content}</div>
                </div>
                <Button onClick={async () => await clickDeleteButton(todo.id)} label={'削除する'} />
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
