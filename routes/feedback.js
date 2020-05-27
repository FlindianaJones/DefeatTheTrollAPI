const { POST_FEEDBACK } = require('../constants')

const express = require('express')
const controller = require('../feedback/controllers/feedback.controller')
const auth = require('../auth/middlewares/verify.user.middleware')
const router = express.Router()

/* POST create new feedback item */
router.post('/', auth.validJWTNeeded, auth.minimumPermissionLevelRequired(POST_FEEDBACK), controller.insert)

module.exports = router
