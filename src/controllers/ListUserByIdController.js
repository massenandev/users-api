const User = require('../models/User')

class ListUserByIdController {
  handle(request, response){
    try{
      const { userId } = request.params
      User.findOne({
        'login.uuid': userId
      }).exec().then((user) => response.json(user))
    } catch (error){
      return response.status(404).json({ error: 'User not found' })
    }
  }
}

const listUserByIdController = new ListUserByIdController()

module.exports = listUserByIdController