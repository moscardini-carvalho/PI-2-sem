const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.get('/login', authController.renderLoginPage)

router.post('/login', authController.loginUser)

module.exports = router
