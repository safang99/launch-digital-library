import pg from "pg"
import path from "path"
import LineReader from "line-reader"
import { fileURLToPath } from "url"

const pool = new pg.Pool({
  connectionString:
    "postgres://postgres:password@localhost:5432/launch_digital_library_development"
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const bookPath = path.join(__dirname, "../../books.txt")

class Seeder {
  static async seed() {
    LineReader.eachLine(bookPath, async (line, last, done) => {
      const [title, page_count, description, fiction] = line.split(";")
      // build our SQL query string
      const queryString =
        "INSERT INTO books (title, page_count, description, fiction) VALUES ($1, $2, $3, $4);"

      //execute our query
      try {
        const result = await pool.query(queryString, [
          title,
          page_count,
          description,
          fiction
        ])
        if (last) {
          //drain the pool because we're done connecting
          pool.end()
        }
        done()
      } catch (error) {
        console.log(`Error: ${error}`)
        done()
      }
    })
  }
}

export default Seeder
