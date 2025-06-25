// Load .env file contents into process.env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const router = require('./routes/authRoutes');
require('./DB/connection'); // Ensure DB connection is initialized

const jpServer = express();

// Middleware
jpServer.use(cors());
jpServer.use(express.json());
jpServer.use(router);

// Health check route
jpServer.get('/', (req, res) => {
    res.send("<h1 style='color:red'>Job Portal server started successfully...</h1>");
});

const PORT = process.env.PORT || 5000;

jpServer.listen(PORT, () => {
    console.log(`jp-server started at PORT: ${PORT}, and waiting for client request`);
});
