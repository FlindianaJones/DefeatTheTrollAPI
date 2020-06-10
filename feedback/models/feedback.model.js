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

const findFeedback = (id) => {
  return new Promise((resolve, reject) => {
    FeedbackModel.findById(id, (err, feedback) => {
      if (err) {
        reject(err)
      } else {
        resolve(feedback)
      }
    })
  })
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

const updoot = (id) => {
  return new Promise((resolve, reject) => {
    findFeedback(id).then((f) => {
      FeedbackModel.findByIdAndUpdate(id, { rating: f.rating + 1 }, { useFindAndModify: false }, (err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    }).catch((e) => { reject(e) })
  })
}

const downdoot = (id) => {
  return new Promise((resolve, reject) => {
    findFeedback(id).then((f) => {
      FeedbackModel.findByIdAndUpdate(id, { rating: f.rating - 1 }, { useFindAndModify: false }, (err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    }).catch((e) => { reject(e) })
  })
}

const FeedbackModel = mongoose.model('Feedback', feedbackSchema)

module.exports = { FeedbackModel, postFeedback, list: listFeedback, updoot, downdoot }
