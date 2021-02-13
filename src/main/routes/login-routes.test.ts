import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Signup Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return ann account on sucess', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Henrique',
        email: 'henrique@campaner.com',
        password: 'password123',
        passwordConfirmation: 'password123'
      })
      .expect(200)
  })
})

describe('POST / signup', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return 200 on signup', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Henrique',
        email: 'henrique@campaner.com',
        password: 'password123',
        passwordConfirmation: 'password123'
      })
      .expect(200)
  })
})
