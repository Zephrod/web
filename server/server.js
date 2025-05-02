// * importe package ou configs etc ...
const express = require('express');
//const mongoose = require('mongoose'); // ! not needed here cause imported in configs/db.js 
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOption = require('./config/corsOption');
const errorHandler = require('./middlewares/errorHandler');

// ! db synchronisation
const connectDB = require('./config/db');
connectDB();

// * Import routes
const authRouter = require("./routes/auth");

// * App init
const app = express();

// * Middleware
app.use(express.json());
app.use(cors(corsOption));
app.use(cookieParser());
app.use(errorHandler);

// * Route
app.use(authRouter);
/*
app.get('/', (req, res) => {
  res.send('Hello from the Node.js backend!');
});*/

//! server
const PORT = 3000;
app.listen(PORT, () =>
    console.log("Server is listening on port " + PORT)
);