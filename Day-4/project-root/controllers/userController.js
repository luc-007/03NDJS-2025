const jwt = require('jsonwebtoken');
const { users } = require('../models/userModel');

const getMe = async(req, res) => {
    try {
        //Extraction du token
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'your-secret-key');
        const userId = decoded.id;
        const user = users.find(user => user.id === userId);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Jeton invalide' });
    }
};

const getAllUsers = async(req, res) => {
    try {
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

const deleteUser = async(req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const userIndex = users.findIndex(user => user.id === userId);

        if (userIndex === -1) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        users.splice(userIndex, 1);
        res.json({ message: 'Utilisateur supprimé' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

module.exports = { getMe, getAllUsers, deleteUser };