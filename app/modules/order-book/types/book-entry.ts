export type BookEntry = {
    /**
     * Price level
     *
     * Float
     */
    price: number,
    /**
     * Number of orders at that price level (delete price level if count = 0)
     *
     * Int
     */
    count: number,
    /**
     * Total amount available at that price level. Trading: if AMOUNT > 0 then bid else ask; Funding: if AMOUNT < 0 then bid else ask;
     *
     * Float
     */
    amount: number
}

export type BookEntryWithTotal = BookEntry & {
    /**
     * Total cumulative sum of the price level
     * total = current amount + prev total
     */
    total: number
}

