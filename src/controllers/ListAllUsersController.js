const User = require('../models/User')

class ListAllUsersController {
  handle(request, response){
    try {
      User.find({ status: 'published' }).then((users) => response.json(users))
    } catch(error) {
      return response.status(500).json({ error: 'Internal server error. Please, try again later' })
    }
  }
}

const listAllUsersController = new ListAllUsersController()

module.exports = listAllUsersController