const mongoose = require('mongoose')
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger.json')
const axios = require('axios')
const User = require('./models/User')
const routes = require('./routes')
const cron = require('node-cron')


main().catch(err => console.log(err));


async function main() {
  await mongoose.connect('mongodb://db:27017', {
    dbName: 'users',
    auth: {
      username: 'root',
      password: 'root'
    }
  });

  cron.schedule("0 0 * * *", () => insertUsers());

  const app = express()
  app.use(express.json())
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
  app.use(routes)
  app.listen(3000, () => console.log('App is running'))
}

function insertUsers(){
  axios.get('https://randomuser.me/api/?page=20&exc=id&results=100')
  .then((response) => {
    User.insertMany(response.data.results)
  });
  console.log('Inserting users')
}

