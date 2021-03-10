const express = require('express');
const router = express.Router();


// Load User model

const { forwardAuthenticated } = require('../config/auth');
const { userRegister, userLogin , userLogout, getUserRegister, getUserLogin, aboutUs, contactUs} = require('../controller/users');

// Login Page
router.get('/login', forwardAuthenticated, getUserLogin);

// Register Page
router.get('/register', forwardAuthenticated, getUserRegister);

// Register
router.post('/register', userRegister );

// Login
router.post('/login', userLogin);

// Logout
router.get('/logout', userLogout);


//About
router.get('/about', aboutUs);

//Contact
router.get('/contact', contactUs);

module.exports = router;
