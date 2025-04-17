const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../models/userModel');

const register = async(req, res) => {
    try {
        const { email, password } = req.body;

        if (users.find(user => user.email === email)) {
            return res.status(400).json({ message: 'L\'utilisateur existe déjà' });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer l'utilisateur
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
};

const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Trouver l'utilisateur
        const user = users.find(user => user.email === email);
        if (!user) {
            return res.status(401).json({ message: 'Informations d\'identification invalides' });
        }

        // Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Informations d\'identification invalides' });
        }

        // Créer le JWT
        const token = jwt.sign({ id: user.id }, 'your-secret-key', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

module.exports = { register, login };