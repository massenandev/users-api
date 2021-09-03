const User = require('../models/User')

class DeleteUserByIdController {
  handle(request, response){
    try {
      const { userId } = request.params
      User.findOneAndDelete({ 'login.uuid': userId })
      response.status(204)
    } catch (error){
      return response.status(404).json({ error: 'User not found' })
    }
  }
}

const deleteUserByIdController = new DeleteUserByIdController()

module.exports = deleteUserByIdController