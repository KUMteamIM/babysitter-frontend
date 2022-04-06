import { User } from "../interfaces"

export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER'

export const updateCurrentUser = (user: User) => {
  return { type: UPDATE_CURRENT_USER, payload: user }
}
