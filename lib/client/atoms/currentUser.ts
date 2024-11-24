import { atom } from 'jotai'

export const currentUserAtom = atom<{
  uid: string,
  displayName: string,
  isAnonymous: boolean
}>({
  uid: '',
  displayName: '',
  isAnonymous: false,
})
