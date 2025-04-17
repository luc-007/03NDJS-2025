const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../models/userModel');

const register = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifie si l'utilisateur existe déjà
        if (users.find(user => user.email === email)) {
            return res.status(400).json({ message: 'L\'utilisateur existe déjà' });
        }

        // Hashage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: users.length + 1,
            email,
            password: hashedPassword,
        };
        users.push(newUser);

        // Retourner l'utilisateur (sans le mot de passe)
        const { password: excludedPassword, ...user } = newUser;
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};  res.status(500).json({ message: 'Erreur serveur' });
      }
    };