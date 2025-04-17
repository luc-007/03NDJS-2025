const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'your-secret-key');
        next();
    } catch (error) {
        res.status(401).json({ message: 'Non autorisé' });
    }
};

module.exports = auth;

//middleman pour assurer que l'utilisateur est authentifié avant d'accéder à certaines routes