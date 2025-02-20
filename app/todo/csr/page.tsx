'use client'
import { useEffect, useState } from 'react'
import styles from './page.module.scss'

import { Button } from '@/components/shared/Button'
import TodoForm from '@/components/todo/TodoForm'

import { deleteTodo, getTodos } from '@/features/todos/todoApi'
import type { Todo } from '@/lib/shared/todo'

export default function Page() {
  const [todos, setTodos] = useState<Array<Todo>>([])

  const fetchTodos = async () => {
    setTodos(await getTodos())
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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
    <div className={styles.container}>
      <section className={styles.section}>
        <TodoForm onCreateTodo={onCreateTodo} />
      </section>
      <section className={styles.section}>
        <h3 className={styles.heading}>ToDoリスト（CSR）</h3>
        <ul className={styles.ul}>
          {todos.map((todo: Todo, index: number) => {
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <li key={index} className={styles.todoItem}>
                <div>
                  <div className={styles.todoName}>{todo.name}</div>
                  <div className={styles.todoContent}>{todo.content}</div>
                </div>
                <Button
                  onClick={async () => await clickDeleteButton(todo.id)}
                  label={'削除する'}
                />
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
