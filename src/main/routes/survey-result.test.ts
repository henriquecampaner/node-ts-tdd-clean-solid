import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
// import { hash } from 'bcrypt'
// import { sign } from 'jsonwebtoken'
// import env from '../config/env'

let accountCollection: Collection
let surveyCollection: Collection

// const makeAccessToken = async (): Promise<string> => {
//   const password = await hash('password123', 12)
//   const res = await accountCollection.insertOne({
//     name: 'Henrique',
//     email: 'henrique@campaner.com',
//     password,
//     role: 'admin',
//   })

//   const id = res.ops[0]._id
//   const accessToken = sign({ id }, env.jwtSecret)

//   await accountCollection.updateOne(
//     { _id: id },
//     {
//       $set: {
//         accessToken,
//       },
//     },
//   )

//   return accessToken
// }

describe('PUT / suruveys/:surveyId/results', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })
  test('Should return 403 on save survey with invalid token', async () => {
    await request(app)
      .put('/api/surveys/any_id/results')
      .send({
        answer: 'any_answer',
      })
      .expect(403)
  })
})
