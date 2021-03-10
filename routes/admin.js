const express = require('express');
const router = express.Router();

const { getAdmin} = require('../controller/admin');

router.get('/index', getAdmin);

module.exports = router;
