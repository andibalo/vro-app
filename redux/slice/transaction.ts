import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ITransaction } from '../../types'

const initialState: ITransaction[] = []

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        addTransaction: (state, action: PayloadAction<ITransaction>) => {
            state.push(action.payload)
        }
    }
})

export const { addTransaction } = transactionSlice.actions

export default transactionSlice.reducer