const mongoose = require('mongoose')
const express = require('express')
const axios = require('axios')
// const user = require('./models/User')

main().catch(err => console.log(err));

axios.get('https://randomuser.me/api')
  .then((response) => {
    console.log(response.data);
  });

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
