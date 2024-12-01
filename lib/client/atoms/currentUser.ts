import { atom } from 'jotai'

export const currentUserAtom = atom<{
  uid: string | null
  displayName: string | null
  isAnonymous: boolean | null
}>({
  uid: null,
  displayName: null,
  isAnonymous: null,
})
