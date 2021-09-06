const mongoose = require('mongoose')
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger.json')
const axios = require('axios')
const User = require('./models/User')
const routes = require('./routes')
const cron = require('node-cron')
const setupApp = require('./app')
const db = require('./db')


main().catch(err => console.log(err));


async function main() {
  await db.connect()

  cron.schedule("* * * * *", insertUsers);

  const app = setupApp()
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
  app.listen(3000, () => console.log('App is running'))
}


let page = 1

function insertUsers(){
  const setNextPage = () => {
    page = page === 20 ? 1 : page + 1
  }

  axios.get(`https://randomuser.me/api/?page=${page}&exc=id&results=100&seed=123456`)
  .then(async (response) => {
    console.log(response.data.info)
    let usersToInsert = response.data.results
    const usersInDb = await User.find({ 'login.uuid': { $in: usersToInsert.map(item => item.login.uuid ) } }).exec()
    if (usersInDb.length > 0) {
      const usersInDbMap = usersInDb.reduce((acc, item) => ({ ...acc, [item.login.uuid]: true }), {})
      usersToInsert = usersToInsert.filter(item => !usersInDbMap[item.login.uuid]);
    }
    User.insertMany(usersToInsert, {}, (err, result) => {
      if (err) {
        console.error(err)
        return
      }
      if (result) {
        setNextPage()
        console.log('Inserted users')
      }
    })
  });
}