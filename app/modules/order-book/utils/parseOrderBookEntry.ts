import { formatPrice } from "../../../shared/utils/format";
import { BookEntry } from "../types/book-entry";

export function parseOrderBookEntry(rawOrderBookEntry: Array<any>): BookEntry {
    return {
        amount: parseFloat(rawOrderBookEntry[2]),
        count: parseFloat(rawOrderBookEntry[1]),
        price: formatPrice(parseFloat(rawOrderBookEntry[0]), "P0"),
    }
}
