import { configureStore } from '@reduxjs/toolkit'
import transactionReducer from './slice/transaction'

export const store = configureStore({
    reducer: {
        transaction: transactionReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;