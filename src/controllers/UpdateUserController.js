const User = require('../models/User')

class UpdateUserController {
  async handle(request, response){
    try{
      const { userId } = request.params
      const body = request.body

      const user = await User.findOne({
        'login.uuid': userId
      }).exec()

      if(!user){
        return response.status(404).json({ error: 'User not found' })
      }

      User.findOneAndUpdate({ 'login.uuid': userId }, body, { new: true }).exec().then((user) => response.status(200).json(user))
    } catch (error){
      return response.status(500).json({ error: 'Internal server error. Please, try again later' })
    }
  }
}

const updateUserController = new UpdateUserController()

module.exports = updateUserController