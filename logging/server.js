const express = require('express');
const logger = require('./middleware/logger');

const app = express();

// Use the logger middleware
app.use(logger);    

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Logging server is running on port ${PORT}`);
});
