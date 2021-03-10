import { Controller } from '@/presentation/protocols'
import { AddSurveyController } from '@/presentation/controllers/survey/add-survey/add-survey-controller'

import { makeLogDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddSurvey } from '@/main/factories/usecases/survey/add-survey/db-add-survey-factory'

import { makeAddSurveyalidation } from './add-survey-validation-factory'

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(
    makeAddSurveyalidation(),
    makeDbAddSurvey(),
  )

  return makeLogDecorator(controller)
}
