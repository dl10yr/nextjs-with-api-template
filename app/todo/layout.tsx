'use client'
import { useCurrentUser } from '@/lib/client/hooks/useCurrentUser'

export default function TodosLayout({ children }: { children: React.ReactNode }) {
  const { isChecking } = useCurrentUser()
  if (isChecking) return <div>isLoginChecking...</div>
  return (
    <div className="min-h-screen flex flex-wrap">
      <div className="w-full">{children}</div>
    </div>
  )
}
