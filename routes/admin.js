const express = require('express')
const router = express.Router()
const controller = require('../controllers/admincontrol')


router.get('/login', controller.getAdminLogin)

router.post('/login',controller.postAdminLogin)

router.get('/system/:adminId',controller.getSystemPage)

router.post('/postproduct',controller.postProduct)


module.exports = router