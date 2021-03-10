import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'

let surveyCollection: Collection

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  const makeSut = (): SurveyMongoRepository => {
    return new SurveyMongoRepository()
  }
  describe('Add()', () => {
    it('should add a survey on success', async () => {
      const sut = makeSut()

      await sut.add({
        question: 'any_question',
        answers: [
          {
            answer: 'any_answer',
            image: 'any_image',
          },
          {
            answer: 'other_answer',
          },
        ],
        date: new Date(),
      })

      const survey = await surveyCollection.findOne({
        question: 'any_question',
      })

      expect(survey).toBeTruthy()
    })
  })

  describe('LoadAll()', () => {
    it('should load all surveys on sucess', async () => {
      await surveyCollection.insertMany([
        {
          question: 'any_question',
          answers: [
            {
              answer: 'any_answer',
              image: 'any_image',
            },
          ],
          date: new Date(),
        },
        {
          question: 'other_question',
          answers: [
            {
              answer: 'other_answer',
              image: 'other_image',
            },
            {
              answer: 'other_answer',
            },
          ],
          date: new Date(),
        },
      ])

      const sut = makeSut()

      const surveys = await sut.loadAll()

      expect(surveys.length).toBe(2)
      expect(surveys[0].question).toBe('any_question')
      expect(surveys[1].question).toBe('other_question')
    })

    it('should load an empty list', async () => {
      const sut = makeSut()

      const surveys = await sut.loadAll()

      expect(surveys.length).toBe(0)
    })
  })

  describe('LoadById()', () => {
    it('should load survey by id on sucess', async () => {
      const res = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [
          {
            answer: 'any_answer',
            image: 'any_image',
          },
        ],
        date: new Date(),
      })

      const sut = makeSut()

      const survey = await sut.loadById(res.ops[0]._id)

      expect(survey).toBeTruthy()
    })
  })
})
