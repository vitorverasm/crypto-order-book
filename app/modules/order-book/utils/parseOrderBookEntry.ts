import { formatPrice } from "../../../shared/utils/format";
import { BookEntry } from "../types/book-entry";

export function parseOrderBookEntry(rawOrderBookEntry: Array<any>): BookEntry {
    const entry = rawOrderBookEntry[1] as number[]
    return {
        amount: entry[2],
        count: entry[1],
        price: formatPrice(entry[0], "P0"),
    }
}
