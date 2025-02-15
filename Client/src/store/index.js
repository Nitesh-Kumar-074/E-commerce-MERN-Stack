import {configureStore} from '@reduxjs/toolkit'
import cartSliceReducer from './cart.js'
import authSliceReducer from './auth.js'

const store = configureStore({
       reducer : {
              cart : cartSliceReducer,
              auth : authSliceReducer
       }
})

export {store}