const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const mongoose = require('mongoose');

// Middleware
app.use(express.json());

// Routes
app.use('/', authRoutes);
app.use('/', userRoutes);

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/LucDigitTech') // Supprime les options ici
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.error('Erreur de connexion à MongoDB', err));

const port = 3000;
app.listen(port, () => console.log(`Serveur en écoute sur le port ${port}`));