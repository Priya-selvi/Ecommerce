const express = require('express');
const cors = require('cors');
const routes = require('./routes/productRoutes');
const connectDB = require('./config/db');
const logger = require('../logging/middleware/logger');

const app = express();
app.use(logger);
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', routes);
app.use('/', routes);   

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});

