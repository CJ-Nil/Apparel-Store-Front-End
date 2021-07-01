import { JwtActionTypes } from './jwtTypes.js'

export const setCurrentJwt = jwt => ({
    type: JwtActionTypes.SET_CURRENT_JWT,
    payload: jwt,
})