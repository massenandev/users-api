const mongoose = require('mongoose')
const express = require('express')


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/users');
  const app = express()
  app.listen(3000, () => console.log('App is running'))
}
