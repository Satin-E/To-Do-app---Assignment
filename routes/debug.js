const express = require('express');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/test-auth', authenticate, (req, res) => {
    console.log('Authenticated user:', req.user);
    res.json({ message: 'User authenticated', user: req.user });
});

module.exports = router;