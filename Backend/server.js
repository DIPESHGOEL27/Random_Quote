const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// Other middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dipeshgoel27:DIPESH%40b127@cluster0.v5dkcsj.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const quoteRouter = require('./routes/quote');
app.use('/quote', quoteRouter);

app.use('/', (req, res) => {
    res.send('Hello World');
});

// Error handling middleware (optional)
app.use((err, _req, res) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});

// Start the server
app.listen(5050, () => {
    console.log('Server is running on port 5050');
});