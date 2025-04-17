const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

// Middleware
app.use(express.json());

// Routes
app.use('/', authRoutes);
app.use('/', userRoutes);

const port = 3000;
app.listen(port, () => console.log(`Serveur en écoute sur le port ${port}`));