'use strict'
const router = require('express').Router()
const {getSignUp,signup_post,getLogIn,postLogIn,getLogout} = require('../controllers/authController')

router.route('/signup')
.get(getSignUp)
.post(signup_post)

router.route('/login')
.get(getLogIn)
.post(postLogIn)

router.get('/logout',getLogout)

module.exports = router;
