import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection: Collection

describe('POST / login', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return 200 on login', async () => {
    const password = await hash('password123', 12)
    await accountCollection.insertOne({
      email: 'henrique@campaner.com',
      password,
    })

    await request(app)
      .post('/api/login')
      .send({
        email: 'henrique@campaner.com',
        password: 'password123',
      })
      .expect(200)
  })

  test('Should return 401 if invalid credentials provided', async () => {
    await request(app)
      .post('/api/login')
      .send({
        email: 'henrique@campaner.com',
        password: 'password123',
      })
      .expect(401)
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
        passwordConfirmation: 'password123',
      })
      .expect(200)
  })
})
