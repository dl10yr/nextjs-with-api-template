import { useAtom } from 'jotai'
import { currentUserAtom } from '../atoms/currentUser'

export function useCurrentUser() {
  const currentUser = useAtom(currentUserAtom)
  const isChecking = currentUser[0].uid === null

  return {
    currentUser,
    isChecking,
  }
}
