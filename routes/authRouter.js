'use strict'
const router = require('express').Router()
const {getSignUp,signup_post,getLogIn,postLogIn} = require('../controllers/authController')

router.route('/signup')
.get(getSignUp)
.post(signup_post)

router.route('/login')
.get(getLogIn)
.post(postLogIn)

module.exports = router;
