import { Precision } from "../../modules/order-book/types/subscription-message"

const precisionMap: Record<Precision, number> = {
    P0: 5,
    P1: 4,
    P2: 3,
    P3: 2,
    P4: 1,
}

export function formatPrice(rawPrice: number, precision: Precision) {
    const priceWithPrecision = rawPrice.toPrecision(precisionMap[precision])
    const price = parseFloat(priceWithPrecision)
    return new Intl.NumberFormat().format(price)
}
