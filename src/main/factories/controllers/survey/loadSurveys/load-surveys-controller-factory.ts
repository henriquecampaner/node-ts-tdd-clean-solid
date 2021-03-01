
import { Controller } from '../../../../../presentation/protocols'

import { makeLogDecorator } from '../../../decorators/log-controller-decorator-factory'
import { LoadSurveysController } from '../../../../../presentation/controllers/survey/load-surveys/load-surveys-controller'
import { makeDbLoadSurveys } from '../../../usecases/survey/load-surveys/db-load-surveys'

export const makeLoadSurveyController = ():Controller => {
  const controller = new LoadSurveysController(makeDbLoadSurveys())

  return makeLogDecorator(controller)
}
