type Precision = 'P0' | 'P1' | 'P2' | 'P3' | 'P4'

type Frequency = 'F0' | 'F1'

export type SubscriptionMessage = {
    /**
     * Trading pair or funding currency
     * @example "tBTCUSD"
     */
    symbol: string
    event: string,
    channel: string,
    /**
     * Level of price aggregation (P0, P1, P2, P3, P4).
     * The default is P0
     */
    prec?: Precision,
    /**
     * Frequency of updates (F0, F1).
     * F0=realtime / F1=2sec.
     * The default is F0.
     */
    freq?: Frequency,
    /**
     * Number of price points ("1", "25", "100", "250") [default="25"]
     */
    len?: string,
    /**
     * Optional user-defined ID for the subscription
     */
    subId?: string
}
