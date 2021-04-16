DROP TABLE IF EXISTS books;

CREATE TABLE books(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  page_count INTEGER NOT NULL,
  description VARCHAR(255),
  fiction BOOLEAN
);