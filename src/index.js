const mongoose = require('mongoose')
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger.json')
const axios = require('axios')
const User = require('./models/User')
const routes = require('./routes')

main().catch(err => console.log(err));


async function main() {
  await mongoose.connect('mongodb://localhost:27017', {
    dbName: 'users',
    auth: {
      username: 'root',
      password: 'root'
    }
  });


  const app = express()
  app.use(express.json())
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
  app.use(routes)
  app.listen(3000, () => console.log('App is running'))
}

