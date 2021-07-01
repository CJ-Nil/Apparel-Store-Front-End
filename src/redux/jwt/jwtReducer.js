import { JwtActionTypes } from './jwtTypes.js'

const INITIAL_STATE = {
    currentJwt: null,
}

const jwtReducer = (state = INITIAL_STATE, action ) => {
    switch(action.type){
        case JwtActionTypes.SET_CURRENT_JWT:
            return{
                ...state,
                currentJwt: action.payload,
            }
        default:
            return state;
    }
}

export default jwtReducer;