const mongoose = require('mongoose')
const express = require('express')
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

  // axios.get('https://randomuser.me/api/?results=10')
  // .then((response) => {
  //   User.insertMany(response.data.results)
  // });

  const app = express()
  app.use(routes)
  app.listen(3000, () => console.log('App is running'))
}

