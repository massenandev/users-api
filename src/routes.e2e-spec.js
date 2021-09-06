require('dotenv').config()
const supertest = require('supertest')
const db = require('./db')
const setupApp = require('./app')
const User = require('./models/User')
const faker = require('faker')


describe('Users Routes', () => {
  let request 

  beforeAll(async () => {
    await db.connect(process.env.MONGO_URL)
    request = supertest(setupApp())
  });

  beforeEach(async () => {
    await User.deleteMany({})
  });

  afterAll(async () => {
    await db.disconnect()
  });

  describe('GET /', () => {
    it('should return 200 with correct message', async () => {
      await request.get('/').expect(200, 'REST Back-end Challenge 20201209 Running')
    });
  });

  describe('GET /users', () => {
    it('should return an empty array if users does not exists on database', async () => {
      await request.get('/users').expect(200, [])
    });

    it('should return an array of users', async () => {
      const users = await User.insertMany([
        {
          name: {
            first: faker.name.firstName()
          }
        },
        {
          name: {
            first: faker.name.firstName()
          }
        }
      ])

      await request.get('/users').expect(200, users.map(item => ({ ...item.toJSON(), _id: item._id.toString(), imported_t: item.imported_t.toISOString() })))
    });
  });

  describe('GET /users/:userId', () => {
    it('should return 200 on success with correct data', async () => {
      const generateRandomUser = () => ({ login: { uuid: faker.datatype.uuid() } })
      const generatedUsers = Array.from({ length: 5 }, generateRandomUser)
      const dbUsers = await User.insertMany(generatedUsers)
      const randomDbUser = faker.random.arrayElement(dbUsers)
      await request.get(`/users/${randomDbUser.login.uuid}`).expect(200, {
        ...randomDbUser.toJSON(), 
        _id: randomDbUser._id.toString(), 
        imported_t: randomDbUser.imported_t.toISOString(),
        login: {
          uuid: randomDbUser.login.uuid
        } 
      })
    });

    it('should return 404 if user not found by id', async () => {
      const randomId = faker.datatype.uuid()
      await request.get(`/users/${randomId}`).expect(404, { error: 'User not found'})
    });
  });

  describe('PUT /users/:userId', () => {
    it('should return 200 on sucess with correct data', async () => {
      const generateRandomUser = () => ({ login: { uuid: faker.datatype.uuid() } })
      const generatedUsers = Array.from({ length: 5 }, generateRandomUser)
      const dbUsers = await User.insertMany(generatedUsers)
      const randomDbUser = faker.random.arrayElement(dbUsers)

      const newFirstName = {
        name: {
          first: faker.name.firstName()
        }
      }

      await request.put(`/users/${randomDbUser.login.uuid}`).send(newFirstName).expect(200, {
        ...randomDbUser.toJSON(), 
        _id: randomDbUser._id.toString(), 
        imported_t: randomDbUser.imported_t.toISOString(),
        login: {
          uuid: randomDbUser.login.uuid
        },
        name: {
          first: newFirstName.name.first
        } 
      })
    });

    it('should return 404 if user not found by id', async () => {
      const randomId = faker.datatype.uuid()
      await request.put(`/users/${randomId}`).expect(404, { error: 'User not found'})
    });
  });

  describe('DELETE /users/:userId', () => {
    it('should return 200 on sucess with correct data', async () => {
      const generateRandomUser = () => ({ login: { uuid: faker.datatype.uuid() } })
      const generatedUsers = Array.from({ length: 5 }, generateRandomUser)
      const dbUsers = await User.insertMany(generatedUsers)
      const randomDbUser = faker.random.arrayElement(dbUsers)

      await request.delete(`/users/${randomDbUser.login.uuid}`).expect(200, {
        message: 'User deleted successfully'
      })
    });

    it('should return 404 if user not found by id', async () => {
      const randomId = faker.datatype.uuid()
      await request.delete(`/users/${randomId}`).expect(404, { error: 'User not found'})
    });
  });
});