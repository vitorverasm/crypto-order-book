import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { BookEntry } from '../types/book-entry'

export interface OrderBookState {
    bids: BookEntry[],
    asks: BookEntry[]
}

const initialState: OrderBookState = {
    bids: [],
    asks: []
}

export const orderBookSlice = createSlice({
    name: 'orderBook',
    initialState,
    reducers: {
        seedInitial: (state, action: PayloadAction<BookEntry[]>) => {
            const entries = action.payload;

            state.bids = entries.filter(entry => entry.amount > 0)
            state.asks = entries.filter(entry => entry.amount < 0)
        },
    },
})

export const { seedInitial } = orderBookSlice.actions

export default orderBookSlice.reducer
