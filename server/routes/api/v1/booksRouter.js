import express from "express"

import Book from "../../../models/Book.js"

const booksRouter = new express.Router()

booksRouter.get("/", async (req, res) => {
  res.json({ books: await Book.findAll() })
  // your code here
})

export default booksRouter
