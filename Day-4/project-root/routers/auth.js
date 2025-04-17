const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        // Extraction du token du header Authorization
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}
module.exports = auth;