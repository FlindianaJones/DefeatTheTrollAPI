const express = require('express')
const controller = require('../users/controllers/users.controller')
const router = express.Router()

/* GET users listing. */
router.get('/', controller.list)

/* GET retrieve user details. */
router.get('/:userId',  controller.getById);

/* POST create new user */
router.post('/', controller.insert)

/* PATCH update existing user details */
router.patch('/:userId', controller.patchById)

/* DELETE remove  user */
router.delete('/:userId', controller.removeById)

module.exports = router;
