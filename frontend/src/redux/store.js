import { configureStore } from '@reduxjs/toolkit'

import cartReducer from '../redux/features/cart/cartSlice'
import authApi from './features/auth/authApi'
import authReducer from './features/auth/authSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath] : authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});