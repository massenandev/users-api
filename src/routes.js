const { Router } = require('express')
const User = require('./models/User')

const router = Router()

router.get('/', (request, response) => {
  response.send('REST Back-end Challenge 20201209 Running')
})

router.get('/users', (request, response) => {
  User.find({ status: 'published' }).then((users) => response.json(users))
})

router.get('/users/:userId', (request, response) => {
  const { userId } = request.params
  User.findOne({
    'login.uuid': userId
  }).exec().then((user) => response.json(user))
})

router.put('/users/:userId', (request, response) => {
  const { userId } = request.params
  const body = request.body
  User.findOneAndUpdate({ 'login.uuid': userId }, body, { new: true }).exec().then((user) => response.json(user))
})



module.exports = router