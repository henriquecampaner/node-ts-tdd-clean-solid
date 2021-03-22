import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result/survey-result-mongo-repository'
import { LoadsurveyResult } from '@/domain/useCases/survey-result/load-survey-result'
import { DbLoadSurveyResult } from '@/data/usecases/survey-result/load-survey-result/load-survey-result'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'

export const makeDbLoadSurveResult = (): LoadsurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const surveyMongoRepository = new SurveyMongoRepository()

  return new DbLoadSurveyResult(
    surveyResultMongoRepository,
    surveyMongoRepository,
  )
}
