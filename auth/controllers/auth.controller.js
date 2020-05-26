const crypto = require('crypto')
const jwt = require('jsonwebtoken')
require('custom-env').env()

const jwtSecret = process.env.JWT_SECRET

const login = (req, res) => {
  try {
    const refreshId = req.body.userId + jwtSecret
    const salt = crypto.randomBytes(16).toString('base64')
    const hash = crypto.createHmac('sha512', salt).update(refreshId).digest('base64')
    req.body.refreshKey = salt
    const token = jwt.sign(req.body, jwtSecret)
    const b = new Buffer(hash)
    const refreshToken = b.toString('base64')
    res.status(201).send({ accessToken: token, refreshToken: refreshToken })
  } catch (err) {
    res.status(500).send({ errors: err })
  }
}

module.exports = { login }
