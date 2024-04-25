import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { BookEntry } from '../types/book-entry'
import { sortAsks, sortBids } from '../utils/sortOrders'

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

            state.bids = sortBids(entries.filter(entry => entry.amount > 0))
            state.asks = sortAsks(entries.filter(entry => entry.amount < 0))
        },
        updateBids: (state, action: PayloadAction<BookEntry>) => {
            const incomingBid = action.payload;

            if (incomingBid.count > 0) {
                const newBids = [...state.bids, incomingBid]
                state.bids = sortBids(newBids)
            }

            if (incomingBid.count === 0) {
                if (incomingBid.amount === 1) {
                    state.bids = sortBids(state.bids.filter(bid => bid.price !== incomingBid.price))
                }
            }
        },
        updateAsks: (state, action: PayloadAction<BookEntry>) => {
            const incomingAsk = action.payload;

            if (incomingAsk.count > 0) {
                const newAsks = [...state.asks, incomingAsk]
                state.asks = sortAsks(newAsks)
            }

            if (incomingAsk.count === 0) {
                if (incomingAsk.amount === -1) {
                    state.asks = sortAsks(state.asks.filter(bid => bid.price !== incomingAsk.price))
                }
            }
        },
    },
})

export const { seedInitial, updateBids, updateAsks } = orderBookSlice.actions

export default orderBookSlice.reducer
