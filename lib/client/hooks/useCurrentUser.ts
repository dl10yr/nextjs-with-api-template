import { useAtom } from 'jotai'
import { currentUserAtom } from '../atoms/currentUser'

export function useCurrentUser() {
  const currentUser = useAtom(currentUserAtom)
  const isChecking = currentUser === undefined

  return {
    currentUser,
    isChecking,
  }
}
