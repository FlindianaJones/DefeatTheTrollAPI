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

module.exports = { insert }
