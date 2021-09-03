const { Router } = require('express')
const User = require('./models/User')

const router = Router()

router.get('/', (request, response) => {
  try {
    response.send('REST Back-end Challenge 20201209 Running')
  } catch(error){
    return response.status(500).json({ error: 'Internal server error. Please, try again later' })
  }
})

router.get('/users', (request, response) => {
  try {
    User.find({ status: 'published' }).then((users) => response.json(users))
  } catch(error) {
    return response.status(500).json({ error: 'Internal server error. Please, try again later' })
  }
})

router.get('/users/:userId', (request, response) => {
  try{
    const { userId } = request.params
    User.findOne({
      'login.uuid': userId
    }).exec().then((user) => response.json(user))
  } catch (error){
    return response.status(404).json({ error: 'User not found' })
  }
})

router.put('/users/:userId', (request, response) => {
  try{
    const { userId } = request.params
    const body = request.body
    User.findOneAndUpdate({ 'login.uuid': userId }, body, { new: true }).exec().then((user) => response.json(user))
  } catch (error){
    return response.status(404).json({ error: 'User not found' })
  }
})

router.delete('/users/:userId', (request, response) => {
  try {
    const { userId } = request.params
    User.findOneAndDelete({ 'login.uuid': userId })
    response.status(204)
  } catch (error){
    return response.status(404).json({ error: 'User not found' })
  }
})

module.exports = router