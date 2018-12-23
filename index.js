const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const app = express();

// Connect to Mongodb 
mongoose.connect('mongodb://localhost/video_store', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB.'));

// using JSON.parse() on incoming(serialized) JSON request.body and deserialize into native JS object req.body
app.use(express.json());

// Routing
app.use('/api/genres', genres);
app.use('/api/customers', customers);

// Listen on Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
