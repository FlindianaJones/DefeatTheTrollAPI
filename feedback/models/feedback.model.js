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
      .populate('poster')
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, feedsback) {
        if (err) {
          reject(err)
        } else {
          const cleanedFeedback = feedsback.map(v => {
            // Can't modify v, for some reason, so clone then return after editing
            const feedbackClone = JSON.parse(JSON.stringify(v))
            delete feedbackClone.__v
            if (feedbackClone.poster) { // it really should be present, but this protects against janky data and local test stuff
              delete feedbackClone.poster._id
              delete feedbackClone.poster.password
              delete feedbackClone.poster.permissionLevel
              delete feedbackClone.poster.email
              delete feedbackClone.poster.__v
            }
            return feedbackClone
          })
          resolve(cleanedFeedback)
        }
      })
  })
}

const FeedbackModel = mongoose.model('Feedback', feedbackSchema)

module.exports = { FeedbackModel, postFeedback, list: listFeedback }
