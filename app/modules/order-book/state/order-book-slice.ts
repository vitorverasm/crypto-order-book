import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { BookEntryWithTotal } from '../types/book-entry'

export interface OrderBookState {
    bids: BookEntryWithTotal[],
    asks: BookEntryWithTotal[]
}

const initialState: OrderBookState = {
    bids: [],
    asks: []
}

export const orderBookSlice = createSlice({
    name: 'orderBook',
    initialState,
    reducers: {
        incrementByAmount: (state, action: PayloadAction<number>) => {
        },
    },
})

export const { incrementByAmount } = orderBookSlice.actions

export default orderBookSlice.reducer
