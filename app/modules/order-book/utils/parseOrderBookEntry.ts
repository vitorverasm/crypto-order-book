import { formatPrice } from "../../../shared/utils/format";
import { BookEntry } from "../types/book-entry";

export function parseOrderBookEntry(rawOrderBookEntry: Array<any>): BookEntry {
    const entry = rawOrderBookEntry[1] as string[]
    return {
        amount: parseFloat(entry[2]),
        count: parseFloat(entry[1]),
        price: formatPrice(parseFloat(entry[0]), "P0"),
    }
}
