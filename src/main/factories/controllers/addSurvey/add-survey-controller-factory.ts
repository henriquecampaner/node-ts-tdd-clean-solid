
import { Controller } from '../../../../presentation/protocols'

import { makeLogDecorator } from '../../decorators/log-controller-decorator-factory'
import { AddSurveyController } from '../../../../presentation/controllers/survey/add-survey/add-survey-controller'
import { makeAddSurveyalidation } from './add-survey-validation-factory'
import { makeDbAddSurvey } from '../../usecases/add-survey/db-add-survey-factory'

export const makeAddSurveyController = ():Controller => {
  const controller = new AddSurveyController(
    makeAddSurveyalidation(),
    makeDbAddSurvey()
  )

  return makeLogDecorator(controller)
}
