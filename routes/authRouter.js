'use strict'
const router = require('express').Router()
const authController = require('../controllers/authController')

// router.get('/signup',authController.getSignUp)
// router.get('/signup',authController.postSignUp)

router.route('/signup')
.get(authController.getSignUp)
.post(authController.signup_post)

router.route('/login')
.get(authController.getLogIn)
.post(authController.postLogIn)

module.exports = router;
