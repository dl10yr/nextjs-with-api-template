'use client'
import { postTodo } from '@/features/todos/todoApi'
import { type FC, useState } from 'react'
import { Button } from '../shared/Button'
import styles from './TodoForm.module.scss'

export interface TodoFormProps {
  onCreateTodo: () => Promise<void>
}

const TodoForm: FC<TodoFormProps> = ({ onCreateTodo }: TodoFormProps) => {
  const [formData, setFormData] = useState({ name: '', content: '' })

  const isValidForm = () => {
    const isValidName = formData.name.length > 0
    const isValidContent =
      formData.content.length > 0 && formData.content.length < 500
    return isValidName && isValidContent
  }

  return (
    <form
      name='postform'
      className={styles.form}
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      onSubmit={async (e: any) => {
        e.preventDefault()
        try {
          await postTodo(formData)
          await onCreateTodo()
        } catch (e) {
          console.error(e)
        }
      }}
    >
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor='name'>
          Todoの名前
        </label>
        <input
          className={styles.input}
          id='name'
          type='text'
          placeholder='Todoの名前（1文字以上30文字以下）'
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
        <label className={styles.label} htmlFor='content'>
          Todoの内容
        </label>
        <textarea
          className={styles.textarea}
          id='content'
          placeholder='Todoの内容（1文字以上300文字以下）'
          rows={10}
          onChange={e => setFormData({ ...formData, content: e.target.value })}
        />
      </div>
      <Button
        size='fullwidth'
        label='追加する'
        primary={true}
        disabled={!isValidForm()}
        type={'submit'}
      />
    </form>
  )
}

export default TodoForm
