const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.cookies.token; 
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = decodedUser; 
        console.log('Authenticated user:', req.user); 
        next(); 
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authenticate;