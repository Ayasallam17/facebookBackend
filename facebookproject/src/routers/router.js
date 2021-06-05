const express = require('express');
const router = new express.Router()
const controller = require('../controller/controller')
const authJwt = require('./verifyJwtToken')
router.post('/api/auth/signup' , controller.signUp)

router.post('/api/auth/signin' , controller.signin)
router.post('/api/test/user' , [authJwt.verifyToken] )
router.post('/api/test/admin' , [authJwt.verifyToken , authJwt.isAdmin] ,controller.adminBord)
module.exports = router