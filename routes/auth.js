const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register); // Sign-Up
router.post('/login', login);       // Log-In
router.post('/logout', logout);     // Log-Out

router.get('/register', (req, res) => {
    res.render('register'); 
});

router.get('/login', (req, res) => {
    res.render('login'); 
});

module.exports = router;