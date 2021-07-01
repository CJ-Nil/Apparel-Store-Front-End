import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './user/user.reducer.js'
import cartReducer from './cart/cart.reducer.js'
import directoryReducer from './directory/directory.reducer'
import shopReducer from './shop/shop.reducer'
import jwtReducer from './jwt/jwtReducer.js'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart','user','jwt']
}

const rootReducer = combineReducers({
  user: userReducer,
  jwt: jwtReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
})

export default persistReducer(persistConfig, rootReducer)