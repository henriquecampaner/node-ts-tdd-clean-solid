import { Controller } from '@/presentation/protocols'

import { makeLogDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadSurveyById } from '@/main/factories/usecases/survey/load-survey-by-id/db-load-survey-by-id-factory'
import { LoadSurveyResultController } from '@/presentation/controllers/survey-result/load-survey-result/load-survey-result-controller'
import { makeDbLoadSurveResult } from '@/main/factories/usecases/survey/survey-result/load-survey-result/db-load-survey-result-factory'

export const makeLoadSurveyResultController = (): Controller => {
  const controller = new LoadSurveyResultController(
    makeDbLoadSurveyById(),
    makeDbLoadSurveResult(),
  )

  return makeLogDecorator(controller)
}
