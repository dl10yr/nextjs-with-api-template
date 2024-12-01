import { prisma } from '@/lib/server/db'
import styles from './page.module.scss'

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
    <div className={styles.container}>
      <section className={styles.section}>
        <h3 className={styles.heading}>ToDoリスト（SSR）</h3>
        <ul className={styles.ul}>
          {todos.map((todo, index: number) => {
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <li key={index} className={styles.todoItem}>
                <div>
                  <div className={styles.todoName}>{todo.name}</div>
                  <div className={styles.todoContent}>{todo.content}</div>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
