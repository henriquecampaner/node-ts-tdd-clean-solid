import { Controller } from '@/presentation/protocols'

import { makeLogDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { SaveSurveyResultController } from '@/presentation/controllers/survey-result/save-survey-result/save-survey-result-controller'
import { makeDbLoadSurveyById } from '@/main/factories/usecases/survey/load-survey-by-id/db-load-survey-by-id-factory'
import { makeDbSaveSurveResult } from '@/main/factories/usecases/survey/survey-result/save-survey-result/db-save-survey-result-factory'

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(
    makeDbLoadSurveyById(),
    makeDbSaveSurveResult(),
  )

  return makeLogDecorator(controller)
}
