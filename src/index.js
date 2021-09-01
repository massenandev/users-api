const mongoose = require('mongoose')
const express = require('express')
const user = require('./models/User')

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
  app.listen(3000, () => console.log('App is running'))
}
