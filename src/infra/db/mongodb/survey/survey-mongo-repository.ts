import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-survey-repository'
import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyModel } from '@/domain/useCases/add-survey'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository
  implements AddSurveyRepository, LoadSurveysRepository {
  async loadAll(): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')

    const surveys: SurveyModel[] = await surveyCollection.find().toArray()

    return surveys
  }

  async add(surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }
}
