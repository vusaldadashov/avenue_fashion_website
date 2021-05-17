const express = require('express')
const router = express.Router()
const controller = require('../controllers/authcontrol')

router.get('/login', controller.getLogin)
router.get('/signup', controller.getSignup)

router.post('/signup', controller.postSignup)
router.post('/login', controller.postLogin)

router.get('/logout',controller.logout)

router.get('/resetpassword', controller.resetPassword)

router.post('/profile/updateuser',controller.updateUser)

router.post('/postresetpassword', controller.postResetPassword)

module.exports = router