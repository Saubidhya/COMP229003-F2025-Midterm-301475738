const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();


connectDB();

app.use(express.json());

app.use('/api/books', require('./routes/books'));

app.get('/', (req, res) => {
    res.json({ message: 'Book Store API is running!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access your API at: http://0.0.0.0:${PORT}`);
});