import pg from "pg"
import _ from "lodash"

const pool = new pg.Pool({
  connectionString:
    "postgres://postgres:postgres@localhost:5432/launch_digital_library_development"
})

class Book {
  constructor({ title, page_count, fiction, description }) {
    this.title = title
    this.pageCount = page_count
    this.fiction = fiction
    this.description = description
  }

  static async findAll() {
    try {
      const result = await pool.query("SELECT * FROM books;")
      const booksData = result.rows

      const bookObjects = booksData.map((bookData) => {
        return new Book(bookData)
      })
      console.log(bookObjects)
      return bookObjects
    } catch (error) {
      console.log(error)
    }
  }
}

export default Book
