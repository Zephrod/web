const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the Node.js backend!');
});

app.listen(PORT, () =>
    console.log("Server is listening on port " + PORT)
);