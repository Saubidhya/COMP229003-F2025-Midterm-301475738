const express = require('express');
const router = express.Router();
const Book = require('../models/Book');


router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        res.json(book);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(500).json({ message: error.message });
    }
});


router.post('/', async (req, res) => {
    try {
        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            ISBN: req.body.ISBN,
            publicationYear: req.body.publicationYear,
            genre: req.body.genre,
            inStock: req.body.inStock
        });
        
        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'ISBN already exists' });
        }
        res.status(400).json({ message: error.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                author: req.body.author,
                price: req.body.price,
                ISBN: req.body.ISBN,
                publicationYear: req.body.publicationYear,
                genre: req.body.genre,
                inStock: req.body.inStock
            },
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json(updatedBook);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'ISBN already exists' });
        }
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(400).json({ message: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        res.json({ message: 'Book deleted successfully', deletedBook });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;