import { Precision } from "../../modules/order-book/types/subscription-message"

const precisionMap: Record<Precision, number> = {
    P0: 5,
    P1: 4,
    P2: 3,
    P3: 2,
    P4: 1,
}

export function formatPrice(rawPrice?: number, precision?: Precision) {
    if (!rawPrice) {
        return new Intl.NumberFormat().format(0)
    }
    const priceWithPrecision = rawPrice.toPrecision(precision ? precisionMap[precision] : 5)
    const price = parseFloat(priceWithPrecision)
    return new Intl.NumberFormat().format(price)
}
