const express = require('express')
const router = express.Router()
const AuthorizationController = require('../auth/controllers/auth.controller')
const VerifyUserMiddleware = require('../auth/middlewares/verify.user.middleware')

/* GET users listing. */
router.post('/', VerifyUserMiddleware.isPasswordAndUserMatch, AuthorizationController.login)

module.exports = router
