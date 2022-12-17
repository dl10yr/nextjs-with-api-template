'use client'
import { FC, useState } from 'react'
import { postTodo } from '@/lib/client/api/todos'
import { Button } from '../shared/Button'

export interface TodoFormProps {
  onCreateTodo?: () => Promise<void>
}

const TodoForm: FC<TodoFormProps> = ({ onCreateTodo }: TodoFormProps) => {
  const [formData, setFormData] = useState({ name: '', content: '' })

  const isValidForm = () => {
    const isValidName = formData.name.length > 0
    const isValidContent = formData.content.length > 0 && formData.content.length < 500
    return isValidName && isValidContent
  }

  return (
    <form
      name="postform"
      className="pt-1 pb-8 mb-4"
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
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
          Todoの名前
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Todoの名前（1文字以上30文字以下）"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <label className="block text-gray-700 font-bold my-2" htmlFor="username">
          Todoの内容
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="content"
          placeholder="Todoの内容（1文字以上300文字以下）"
          rows={10}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />
      </div>
      <Button
        size="fullwidth"
        label="追加する"
        primary={true}
        disabled={!isValidForm()}
        type={`submit`}
      />
    </form>
  )
}

export default TodoForm
