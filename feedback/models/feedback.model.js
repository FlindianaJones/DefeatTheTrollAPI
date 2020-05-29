const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
  content: { type: String, required: true },
  title: { type: String, required: true },
  rating: Number,
  created: Date,
  poster: {
    type: mongoose.Schema.Types.ObjectID, ref: 'Users'
  }
})

const postFeedback = (feedbackData) => {
  const feedback = new FeedbackModel(feedbackData)
  return feedback.save()
}

const listFeedback = (perPage, page) => {
  return new Promise((resolve, reject) => {
    FeedbackModel.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, feedsback) {
        if (err) {
          reject(err)
        } else {
          resolve(feedsback)
        }
      })
  })
}

const FeedbackModel = mongoose.model('Feedback', feedbackSchema)

module.exports = { FeedbackModel, postFeedback, list: listFeedback }
