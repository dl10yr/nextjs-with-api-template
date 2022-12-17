import { prisma } from '@/lib/server/db'

export const revalidate = 0
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

async function getTodos() {
  return await prisma.todo.findMany({
    include: {
      user: true,
    },
  })
}

export default async function Page() {
  const todos = await getTodos()

  return (
    <div className="w-full">
      <section className="p-3 max-w-screen-sm m-auto">
        <h3 className="text-2xl font-bold m-2 text-center">ToDoリスト（SSR）</h3>
        <ul className="m-3">
          {todos.map((todo, index: number) => {
            return (
              <li key={index} className="m-3 p-3 bg-white rounded">
                <div>
                  <div className="font-bold">{todo.name}</div>
                  <div className="mt-3 break-words">{todo.content}</div>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
