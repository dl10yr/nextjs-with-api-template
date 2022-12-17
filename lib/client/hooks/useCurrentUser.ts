import { useRecoilValue } from 'recoil'
import { currentUserState } from '../atoms/currentUser'

export function useCurrentUser() {
  const currentUser = useRecoilValue(currentUserState)
  const isChecking = currentUser === undefined

  return {
    currentUser,
    isChecking,
  }
}
