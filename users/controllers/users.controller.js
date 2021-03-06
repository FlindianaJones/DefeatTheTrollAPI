const UserModel = require('./../models/users.model')
const {POST_FEEDBACK, USER_EDIT, LIST_FEEDBACK} = require('./../../constants')
const crypto = require('crypto')

const insert = (req, res) => {
  const salt = crypto.randomBytes(16).toString('base64')
  const hash = crypto.createHmac('sha512', salt)
    .update(req.body.password)
    .digest('base64')
  req.body.password = salt + '$' + hash
  req.body.permissionLevel = 0 | POST_FEEDBACK | USER_EDIT | LIST_FEEDBACK
  UserModel.createUser(req.body)
    .then((result) => {
      res.status(201).send({ id: result._id })
    }).catch(reason => {
      res.status(500).send(JSON.stringify(reason))
    })
}

const getById = (req, res) => {
  UserModel.findById(req.params.userId).then((result) => {
    res.status(200).send(result)
  })
}

const patchById = (req, res) => {
  if (req.body.password) {
    const salt = crypto.randomBytes(16).toString('base64')
    const hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64')
    req.body.password = salt + '$' + hash
  }
  UserModel.patchUser(req.params.userId, req.body).then(() => {
    res.status(204).send({})
  })
}

const list = (req, res) => {
  const limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10
  let page = 0
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page)
      page = Number.isInteger(req.query.page) ? req.query.page : 0
    }
  }
  UserModel.list(limit, page).then((result) => {
    res.status(200).send(result)
  })
}

const removeById = (req, res) => {
  UserModel.removeById(req.params.userId)
    .then(() => {
      res.status(204).send({})
    })
}

module.exports = { insert, getById, patchById, list, removeById }
