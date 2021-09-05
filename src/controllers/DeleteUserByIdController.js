const User = require('../models/User')

class DeleteUserByIdController {
  async handle(request, response){
    try {
      const { userId } = request.params

      const user = await User.findOne({
        'login.uuid': userId
      }).exec()

      if(!user){
        return response.status(404).json({ error: 'User not found' })
      }

      User.findOneAndDelete({ 'login.uuid': userId })
      response.status(200).json({ message: 'User deleted successfully' })
    } catch (error){
      return response.status(500).json({ error: 'Internal server error. Please, try again later' })
    }
  }
}

const deleteUserByIdController = new DeleteUserByIdController()

module.exports = deleteUserByIdController