const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


connectDB();


app.use(express.json());

app.use('/api/books', require('./routes/books'));

app.get('/', (req, res) => {
    res.json({ message: 'Book Store API is running!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});