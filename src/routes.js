const { Router } = require('express')
const User = require('./models/User')

const router = Router()

router.get('/', (request, response) => {
  response.send('REST Back-end Challenge 20201209 Running')
})

router.get('/users', (request, response) => {
  User.find({ status: 'published' }).then((users) => response.json(users))
})
module.exports = router