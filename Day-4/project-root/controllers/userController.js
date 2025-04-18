const User = require('../models/userModel');

const getMe = async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

const getAllUsers = async(req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Non autorisé' });
        }

        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

const deleteUser = async(req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Non autorisé' });
        }

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.json({ message: 'Utilisateur supprimé' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

module.exports = { getMe, getAllUsers, deleteUser };