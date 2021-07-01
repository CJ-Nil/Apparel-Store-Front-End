import { UserActionTypes } from './user.types.js'

const INITIAL_STATE = {
    currentUser: null,
    role:null
}

const userReducer = (state = INITIAL_STATE, action ) => {
    switch(action.type){
        case UserActionTypes.SET_CURRENT_USER:
            return{
                ...state,
                currentUser: action.payload
                
            }
        case UserActionTypes.SET_USER_ROLE:
            return{
                ...state,
                role: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;