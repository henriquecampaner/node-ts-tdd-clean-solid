import { InvalidParamError } from '@/presentation/erros'
import { forbidden } from '@/presentation/helpers/http/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  LoadSurveyById,
} from './load-survey-result-controller-protocols'

export class LoadSurveyResultController implements Controller {
  constructor(private readonly loadSurveyById: LoadSurveyById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const surveyResult = await this.loadSurveyById.loadById(
      httpRequest.params.surveyId,
    )

    if (!surveyResult) {
      return forbidden(new InvalidParamError('surveyId'))
    }

    return Promise.resolve(null)
  }
}
