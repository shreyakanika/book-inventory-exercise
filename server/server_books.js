const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3002; 

// Enable CORS for the React application to connect
app.use(cors()); 

app.use(express.json()); 

// --- In-Memory Data Store ---
let books = [
    {
      id: 1,
      title: 'Harry Potter and the Deathly Hallows: Part 1',
      description: 'Harry Potter and the Deathly Hallows: Part 1',
      imageURL: 'https://placehold.co/100x150/505050/ffffff?text=Harry Potter and the Deathly Hallows: Part 1', 
    },
    {
      id: 2,
      title: 'Harry Potter and the Deathly Hallows: Part 2',
      description: 'Harry Potter and the Deathly Hallows: Part 2',
      imageURL: 'https://placehold.co/100x150/3490dc/ffffff?text=Harry Potter and the Deathly Hallows: Part 2',
    },
];

let nextBookId = books.length + 1;

// --- API Endpoints ---

// GET /api/books: Get all books
app.get('/api/books',
(req, res) => {
    console.log('GET /api/books request received.');
    // Simulate a network delay
    setTimeout(() => {
        res.json(books);
    },
500); 
});

// POST /api/books: Add a new book
app.post('/api/books',
(req, res) => {
    const { title, description, imageUrl } = req.body;
    
    if (!title) {
        return res.status(400).json({ error: 'Book title is required.' });
    }
    const newBook = {
        id: nextBookId+=1,
        title: title || `Untitled Book ${nextBookId}`,
        description: description || 'No Description.',
        imageURL: imageUrl || `https://placehold.co/100x150/6b7280/ffffff?text=${title}`,
    };
    books.push(newBook);
    console.log(`POST /api/books: Added new book ID ${newBook.id}`);
    
    // Respond with the newly created book object
    res.status(201).json(newBook); 
});

// Basic check
app.get('/',
(req, res) => {
    res.send(`Node API Server is running on port ${PORT}. Books endpoint is /api/books`);
});

app.listen(PORT,
() => {
    console.log(`Books API Server running at http://localhost:${PORT}`);
    console.log(`GET Endpoint: http://localhost:${PORT}/api/books`);
});