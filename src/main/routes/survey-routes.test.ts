import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let accountCollection: Collection
let surveyCollection: Collection

const makeAccessToken = async ():Promise<string> => {
  const password = await hash('password123', 12)
  const res = await accountCollection.insertOne({
    name: 'Henrique',
    email: 'henrique@campaner.com',
    password,
    role: 'admin'
  })

  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)

  await accountCollection.updateOne({ _id: id }, {
    $set: {
      accessToken
    }
  })

  return accessToken
}

describe('POST / surveys', () => {
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

  describe('POST / suruveys ', () => {
    test('Should return 403 on add survey with invalid token', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [
            {
              answer: 'Answer 1',
              image: 'http://image-name.com'
            },
            {
              answer: 'Answer 2'
            }
          ]
        })
        .expect(403)
    })

    test('Should return 204 on add survey sucess', async () => {
      const accessToken = await makeAccessToken()

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [
            {
              answer: 'Answer 1',
              image: 'http://image-name.com'
            },
            {
              answer: 'Answer 2'
            }
          ]
        })
        .expect(204)
    })
  })

  describe('GET / suruveys ', () => {
    test('Should return 403 on load survey with invalid token', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403)
    })

    test('Should return 200 on load survey sucess', async () => {
      const accessToken = await makeAccessToken()

      await surveyCollection.insertMany([
        {
          question: 'any_question',
          answers: [
            {
              answer: 'any_answer',
              image: 'any_image'
            }
          ],
          date: new Date()
        },
        {
          question: 'other_question',
          answers: [
            {
              answer: 'other_answer',
              image: 'other_image'
            },
            {
              answer: 'other_answer'
            }
          ],
          date: new Date()
        }
      ])

      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
