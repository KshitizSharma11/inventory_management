const express = require('express');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/itemRoutes');
require('dotenv').config();
const db=require('./Db');
const app = express();
const PORT = process.env.PORT ||2000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Mount itemRoutes at the /items endpoint
app.use('/items', itemRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
