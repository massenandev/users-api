const mongoose = require('mongoose')

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env

const options = {
  useNewUrlParser: true,
  connectTimeoutMS: 10000,
};

const defaultUrl = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`
module.exports = {
  connect: (url = defaultUrl) => {
    return mongoose.connect(url, options).catch((err) => console.log(err))
  },
  disconnect: () => {
    return mongoose.disconnect()
  }
}