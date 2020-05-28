const { USER_LIST, USER_DELETE, USER_EDIT, USER_SEARCH } = require('../constants')

const express = require('express')
const controller = require('../users/controllers/users.controller')
const auth = require('../auth/middlewares/verify.user.middleware')
const log = require('../logging.middleware')
const router = express.Router()

/* GET users listing. */
router.get('/', auth.validJWTNeeded, log, auth.minimumPermissionLevelRequired(USER_LIST), controller.list)

/* GET retrieve user details. */
router.get('/:userId', auth.validJWTNeeded, log, auth.minimumPermissionLevelRequired(USER_SEARCH), controller.getById)

/* POST create new user */
router.post('/', log, controller.insert)

/* PATCH update existing user details */
router.patch('/:userId', auth.validJWTNeeded, log, auth.minimumPermissionLevelRequired(USER_EDIT), controller.patchById)

/* DELETE remove  user */
router.delete('/:userId', auth.validJWTNeeded, log, auth.minimumPermissionLevelRequired(USER_DELETE), controller.removeById)

module.exports = router
