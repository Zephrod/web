// * importe package ou configs etc ...
const express = require('express');
//const mongoose = require('mongoose'); // ! not needed here cause imported in configs/db.js 
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

// ! db synchronisation
const connectDB = require('./configs/db');
connectDB();

// * Import routes

// * App init
const app = express();

// * Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// * Route
/*
app.get('/', (req, res) => {
  res.send('Hello from the Node.js backend!');
});*/

//! server
const PORT = 3000;
app.listen(PORT, () =>
    console.log("Server is listening on port " + PORT)
);