import { UserActionTypes } from './user.types.js'

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
})
export const setUserRole = role => ({
    type: UserActionTypes.SET_USER_ROLE,
    payload: role
})