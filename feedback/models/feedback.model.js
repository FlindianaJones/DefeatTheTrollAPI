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

const FeedbackModel = mongoose.model('Feedback', feedbackSchema)

module.exports = { FeedbackModel, postFeedback }
