const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const register = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'L\'utilisateur existe déjà' });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer l'utilisateur
        const newUser = new User({
            email,
            password: hashedPassword,
        });
        await newUser.save();

        // Retourner l'utilisateur (sans le mot de passe)
        const { password: excludedPassword, ...user } = newUser.toObject();
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Email reçu:', email);
        console.log('Mot de passe reçu:', password);

        // Trouver l'utilisateur
        const user = await User.findOne({ email });
        console.log('Utilisateur trouvé:', user);
        if (!user) {
            return res.status(401).json({ message: 'Informations d\'identification invalides' });
        }

        // Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Mot de passe valide:', isPasswordValid);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Informations d\'identification invalides' });
        }

        // Créer le JWT
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, 'your-secret-key', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

module.exports = { register, login };