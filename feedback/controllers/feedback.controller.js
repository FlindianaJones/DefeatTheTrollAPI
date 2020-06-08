const FeedbackModel = require('./../models/feedback.model')

const insert = (req, res) => {
  if (!req.body || !req.body.content || !req.body.title) {
    res.status(400).send('Malformed request, missing fields')
    return
  }
  const feedback = req.body
  feedback.created = new Date()
  feedback.rating = 1
  feedback.poster = req.jwt.userId
  FeedbackModel.postFeedback(req.body)
    .then((result) => {
      res.status(201).send({ id: result._id })
    }).catch(reason => {
      res.status(500).send(JSON.stringify(reason))
    })
}

// TODO: Gotta populate the user names up in here
const list = (req, res) => {
  const limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10
  let page = 0
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page)
      page = Number.isInteger(req.query.page) ? req.query.page : 0
    }
  }
  FeedbackModel.list(limit, page).then((result) => {
    res.status(200).send(result)
  })
}

module.exports = { insert, list }
