import type { Db } from "mongodb"

export class Book {
    title: string
    author: string
    year: number
    constructor(title: string, author: string, year: number) {
        this.title = title
        this.author = author
        this.year = year
    }
}

export async function add_books(db: Db, books: Book[]) {
    const collection = db.collection("books");
    await collection.insertMany(books);
}