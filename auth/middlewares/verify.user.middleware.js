const UserModel = require('../../users/models/users.model')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
require('custom-env').env()

const jwtSecret = process.env.JWT_SECRET

const isPasswordAndUserMatch = (req, res, next) => {
  console.log(`Auth request for ${req.body.email}`)
  UserModel.findByEmail(req.body.email)
    .then((user) => {
      if (!user) {
        res.status(404).send({})
      } else {
        const passwordFields = user.password.split('$')
        const salt = passwordFields[0]
        const hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64')
        if (hash === passwordFields[1]) {
          req.body = {
            userId: user._id,
            email: user.email,
            permissionLevel: user.permissionLevel,
            provider: 'email',
            name: user.firstName + ' ' + user.lastName
          }
          return next()
        } else {
          return res.status(400).send({ errors: ['Invalid email or password'] })
        }
      }
    })
}

const validJWTNeeded = (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const authorization = req.headers.authorization.split(' ')
      if (authorization[0] !== 'Bearer') {
        return res.status(401).send()
      } else {
        req.jwt = jwt.verify(authorization[1], jwtSecret)
        return next()
      }
    } catch (err) {
      console.error(err)
      return res.status(403).send()
    }
  } else {
    return res.status(401).send()
  }
}

const minimumPermissionLevelRequired = (requiredPermissionLevel) => {
  return (req, res, next) => {
    const userPermissionLevel = parseInt(req.jwt.permissionLevel)
    if (userPermissionLevel & requiredPermissionLevel) {
      return next()
    } else {
      console.log(`You absolute fool, you have ${userPermissionLevel} and needed ${requiredPermissionLevel}!`)
      return res.status(403).send()
    }
  }
}

module.exports = { isPasswordAndUserMatch, validJWTNeeded, minimumPermissionLevelRequired }
