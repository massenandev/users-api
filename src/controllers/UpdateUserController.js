const User = require('../models/User')

class UpdateUserController {
  handle(request, response){
    try{
      const { userId } = request.params
      const body = request.body
      User.findOneAndUpdate({ 'login.uuid': userId }, body, { new: true }).exec().then((user) => response.json(user))
    } catch (error){
      return response.status(404).json({ error: 'User not found' })
    }
  }
}

const updateUserController = new UpdateUserController()

module.exports = updateUserController