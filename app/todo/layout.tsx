'use client'
import { useCurrentUser } from '@/lib/client/hooks/useCurrentUser'
import styles from './layout.module.scss'

export default function TodosLayout({
  children,
}: { children: React.ReactNode }) {
  const { isChecking } = useCurrentUser()
  if (isChecking) return <div>isLoginChecking...</div>
  return (
    <div className={styles.container}>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
