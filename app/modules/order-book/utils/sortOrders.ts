import { BookEntry } from "../types/book-entry";

export function sortBids(orders: BookEntry[]) {
    return orders.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
}

export function sortAsks(orders: BookEntry[]) {
    return orders.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
}
