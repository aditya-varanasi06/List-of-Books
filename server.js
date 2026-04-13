const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());


let books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  { id: 3, title: '1984', author: 'George Orwell' },
];

let nextId = 4;


app.get('/books', (req, res) => {
  res.status(200).json({
    success: true,
    count: books.length,
    data: books,
  });
});


app.get('/books/:id', (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));

  if (!book) {
    return res.status(404).json({ success: false, message: `Book with id ${req.params.id} not found` });
  }

  res.status(200).json({ success: true, data: book });
});


app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ success: false, message: 'Both "title" and "author" are required' });
  }

  const newBook = { id: nextId++, title: title.trim(), author: author.trim() };
  books.push(newBook);

  res.status(201).json({ success: true, message: 'Book created successfully', data: newBook });
});


app.put('/books/:id', (req, res) => {
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ success: false, message: `Book with id ${req.params.id} not found` });
  }

  const { title, author } = req.body;

  if (!title && !author) {
    return res.status(400).json({ success: false, message: 'Provide at least one field to update: "title" or "author"' });
  }

  if (title) books[index].title = title.trim();
  if (author) books[index].author = author.trim();

  res.status(200).json({ success: true, message: 'Book updated successfully', data: books[index] });
});


app.delete('/books/:id', (req, res) => {
  const index = books.findIndex((b) => b.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ success: false, message: `Book with id ${req.params.id} not found` });
  }

  const deleted = books.splice(index, 1)[0];

  res.status(200).json({ success: true, message: 'Book deleted successfully', data: deleted });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found` });
});


app.listen(PORT, () => {
  console.log(`📚 Books API running at http://localhost:${PORT}`);
  console.log('\nAvailable endpoints:');
  console.log('  GET    /books');
  console.log('  GET    /books/:id');
  console.log('  POST   /books');
  console.log('  PUT    /books/:id');
  console.log('  DELETE /books/:id');
});

module.exports = app;
