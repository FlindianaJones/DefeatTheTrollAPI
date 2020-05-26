const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  permissionLevel: Number
})

const userModel = mongoose.model('Users', userSchema)

const createUser = (userData) => {
  console.log('Got user: ' + JSON.stringify(userData))
  const user = new userModel(userData)
  console.log('Saving ' + JSON.stringify(user))
  return user.save()
}

const findById = (id) => {
  return userModel.findById(id).then((result) => {
    result = result.toJSON()
    delete result._id
    delete result.__v
    return result
  })
}

const findByEmail = (email) => {
  return userModel.findOne({ email: email }).then((result) => {
    result = result.toJSON()
    delete result._id
    delete result.__v
    return result
  })
}

const patchUser = (id, userData) => {
  return new Promise((resolve, reject) => {
    userModel.findById(id, function (err, user) {
      if (err) reject(err)
      for (let i in userData) {
        user[i] = userData[i]
      }
      user.save(function (err, updatedUser) {
        if (err) return reject(err)
        resolve(updatedUser)
      })
    })
  })
}

const list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    userModel.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, users) {
        if (err) {
          reject(err)
        } else {
          resolve(users)
        }
      })
  })
}

const removeById = (userId) => {
  return new Promise((resolve, reject) => {
    userModel.remove({ _id: userId }, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve(err)
      }
    })
  })
}

module.exports = { createUser, findById, findByEmail, patchUser, list, removeById }