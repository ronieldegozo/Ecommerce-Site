const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const { userDashboard, userHome } = require('../controller/users');

// Welcome Page
router.get('/', forwardAuthenticated,userHome );

// Dashboard
router.get('/dashboard', ensureAuthenticated, userDashboard);

module.exports = router;
