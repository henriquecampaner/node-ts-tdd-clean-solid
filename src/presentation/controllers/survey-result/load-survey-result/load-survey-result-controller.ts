import { InvalidParamError } from '@/presentation/erros'
import { forbidden, serverError } from '@/presentation/helpers/http/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveyById,
  LoadsurveyResult,
} from './load-survey-result-controller-protocols'

export class LoadSurveyResultController implements Controller {
  constructor(
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadsurveyResult: LoadsurveyResult,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const surveyResult = await this.loadSurveyById.loadById(surveyId)

      if (!surveyResult) {
        return forbidden(new InvalidParamError('surveyId'))
      }

      await this.loadsurveyResult.load(surveyId)

      return Promise.resolve(null)
    } catch (error) {
      return serverError(error)
    }
  }
}
