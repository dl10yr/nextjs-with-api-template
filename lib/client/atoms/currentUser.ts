import { atom } from 'recoil'

export const currentUserState = atom({
  key: 'CurrentUser',
  default: undefined,
})
