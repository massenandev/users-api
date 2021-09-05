const User = require('../models/User')

class GetUserByIdController {
  async handle(request, response){
    try{
      const { userId } = request.params
      const user = await User.findOne({
        'login.uuid': userId
      }).exec()

      if(!user){
        return response.status(404).json({ error: 'User not found' })
      }
      
      return response.json(user)
    } catch (error){
      return response.status(500).json({ error: error.message })
    }
  }
}

const getUserByIdController = new GetUserByIdController()

module.exports = getUserByIdController