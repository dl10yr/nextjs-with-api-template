'use client'
import { postTodo } from '@/lib/client/api/todos'
import { firebaseClientAuth } from '@/lib/client/firebaseClient'
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import { FC, useEffect, useState } from 'react'
import { Button } from '../shared/Button'

const EntryLogForm: FC = () => {
  const [, setUser] = useState({ uid: '' })
  const [formData, setFormData] = useState({ name: '', content: '' })

  const fetchSetUser = async () => {
    try {
      onAuthStateChanged(firebaseClientAuth, async (user) => {
        if (!user) {
          signInAnonymously(firebaseClientAuth)
            .then(async (e) => {
              if (e.user) {
                setUser({ uid: e.user.uid })
              }
            })
            .catch(() => {
              // console.log(error)
            })
        } else {
          setUser({
            uid: user.uid,
          })
        }
      })
    } catch {
      setUser({ uid: '' })
    }
  }

  useEffect(() => {
    fetchSetUser()
  }, [])

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

export default EntryLogForm
