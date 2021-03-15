import { SaveSurveyResult } from '@/domain/useCases/survey-result/save-survey-result'
import { DbSaveResult } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result/survey-result-mongo-repository'

export const makeDbSaveSurveResult = (): SaveSurveyResult => {
  const surveyMongoRepository = new SurveyResultMongoRepository()

  return new DbSaveResult(surveyMongoRepository)
}
