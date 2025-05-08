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
const userRouter = require("./routes/user");
const courseRouter = require("./routes/course");

const Course = require('./models/course');
const User = require('./models/user');

// * App init
const app = express();

// * Middleware
app.use(express.json());
app.use(cors(corsOption));
app.use(cookieParser());
app.use(errorHandler);

// * Route
app.use(authRouter);
app.use(userRouter);
app.use(courseRouter);
/*
app.get('/', (req, res) => {
  res.send('Hello from the Node.js backend!');
});*/

app.post('/seed-test-data', async (req, res) => {
  try {
    // Create test professor
    const prof = await User.create({
      name: "Test Professor",
      email: "prof@univ.test",
      password: "test1234",
      role: "teacher"
    });

    // Create test student
    const student = await User.create({
      name: "Test Student",
      email: "student@univ.test",
      password: "test1234",
      role: "student"
    });

    // Create test course
    const course = await Course.create({
      name: "Introduction to Testing",
      code: "TEST101",
      professor: prof._id,
      students: [student._id],
      schedule: {
        weeks: [{
          weekNumber: 1,
          days: [{
            day: "Monday",
            startTime: "09:00",
            endTime: "11:00",
            room: "T-101"
          }]
        }]
      }
    });

    res.status(201).json({ message: "Test data created", prof, student, course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//! server
const PORT = 3000;
app.listen(PORT, () =>
    console.log("Server is listening on port " + PORT)
);