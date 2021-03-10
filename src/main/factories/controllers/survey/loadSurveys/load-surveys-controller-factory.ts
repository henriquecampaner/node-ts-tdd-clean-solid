import { Controller } from '@/presentation/protocols'
import { LoadSurveysController } from '@/presentation/controllers/survey/load-surveys/load-surveys-controller'

import { makeLogDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadSurveys } from '@/main/factories/usecases/survey/load-surveys/db-load-surveys'

export const makeLoadSurveyController = (): Controller => {
  const controller = new LoadSurveysController(makeDbLoadSurveys())

  return makeLogDecorator(controller)
}
