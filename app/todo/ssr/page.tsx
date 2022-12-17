import { prisma } from '@/lib/server/db'

export const revalidate = 60

async function getToDos() {
  return await prisma.todo.findMany({
    include: {
      user: true,
    },
  })
}

export default async function Page() {
  const todos = await getToDos()

  return (
    <div className="w-full">
      <section className="p-3 max-w-screen-sm m-auto">
        <h3 className="text-2xl font-bold m-2 text-center">ToDoリスト（SSR）</h3>
        <ul className="m-3">
          {todos.map((log, index: number) => {
            return (
              <li key={index} className="m-3 p-3 bg-white rounded">
                <div>
                  <div className="font-bold">{log.user.name}</div>
                  <div className="mt-3 break-words">{log.content}</div>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
