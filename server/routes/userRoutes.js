require('dotenv').config
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// user homepage
router.get('/', userController.homePage);

module.exports = router;

