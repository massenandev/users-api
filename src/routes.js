const { Router } = require('express')

const returnMessageController = require('./controllers/ReturnMessageController')
const listAllUsersController = require('./controllers/ListAllUsersController')
const getUserByIdController = require('./controllers/GetUserByIdController')
const updateUserController = require('./controllers/UpdateUserController')
const deleteUserByIdController = require('./controllers/DeleteUserByIdController')

const router = Router()

router.get('/', (request, response) => {
  returnMessageController.handle(request, response)
})

router.get('/users', (request, response) => {
  listAllUsersController.handle(request, response)
})

router.get('/users/:userId', (request, response) => {
  getUserByIdController.handle(request, response)
})

router.put('/users/:userId', (request, response) => {
  updateUserController.handle(request, response)
})

router.delete('/users/:userId', (request, response) => {
  deleteUserByIdController.handle(request, response)
})

module.exports = router