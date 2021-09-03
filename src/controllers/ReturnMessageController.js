class ReturnMessageController {
  handle(request, response){
    try {
      response.send('REST Back-end Challenge 20201209 Running')
    } catch(error){
      return response.status(500).json({ error: 'Internal server error. Please, try again later' })
    }
  }
}

const returnMessageController = new ReturnMessageController()

module.exports = returnMessageController