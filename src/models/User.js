const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String
})

const User = mongoose.model('User', userSchema)

const user = new User({ name: 'username' })

module.exports = user