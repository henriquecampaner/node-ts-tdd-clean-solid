import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { LogoMongoRepository } from './log'

describe('Log Mongo Repository', async () => {
  let errorCollection:Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  test('Should create an error log on sucess', async () => {
    const sut = new LogoMongoRepository()
    await sut.logError('any_error')

    const count = await errorCollection.countDocuments()

    expect(count).toBe(1)
  })
})
