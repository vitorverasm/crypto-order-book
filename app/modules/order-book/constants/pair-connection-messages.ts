import { SubscriptionMessage } from "../types/subscription-message"

const btcUsdSubscription: SubscriptionMessage = {
    event: 'subscribe',
    channel: 'book',
    symbol: 'tBTCUSD',
    freq: "F0",
    prec: "P0",
    len: "25"
}

export default {
    btcUsd: JSON.stringify(btcUsdSubscription)
}
