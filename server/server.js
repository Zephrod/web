// * importe package ou configs etc ...
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOption = require('./config/corsOption');
const errorHandler = require('./middlewares/errorHandler');
const swaggerUi = require('swagger-ui-express');
const specs = require('./config/swagger');

// ! db synchronisation
const connectDB = require('./config/db');
connectDB();

// * Import routes
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const courseRouter = require("./routes/course");

// * App init
const app = express();

// * Middleware / configs
app.use(express.json());
app.use(cors(corsOption));
app.use(cookieParser());
app.use(errorHandler);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// * Route
app.use(authRouter);
app.use(userRouter);
app.use(courseRouter);
/*
app.get('/', (req, res) => {
  res.send('Hello from the Node.js backend!');
});*/

//! server
const PORT = 3000;
app.listen(PORT, () =>
    console.log("Server is listening on port " + PORT)
);