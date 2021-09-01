const { Router } = require('express')

const router = Router()

router.get('/', (request, response) => {
  response.send('REST Back-end Challenge 20201209 Running')
})

module.exports = router