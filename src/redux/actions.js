export const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER'

export const updateCurrentUser = user => {
  return { type: UPDATE_CURRENT_USER, payload: user }
}
