import {
  LoadSurveyById,
  HttpRequest,
  LoadsurveyResult,
} from './load-survey-result-controller-protocols'
import { mockLoadSurveyById, mockLoadSurveyResult } from '@/presentation/test'
import { LoadSurveyResultController } from './load-survey-result-controller'

import { InvalidParamError } from '@/presentation/erros'
import { forbidden, serverError } from '@/presentation/helpers/http/http-helper'
import { throwError } from '@/domain/test'

const mockRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id',
  },
})

type sutTypes = {
  loadSurveyByIdStub: LoadSurveyById
  sut: LoadSurveyResultController
  loadSurveyResultStub: LoadsurveyResult
}

const makeSut = (): sutTypes => {
  const loadSurveyResultStub = mockLoadSurveyResult()
  const loadSurveyByIdStub = mockLoadSurveyById()
  const sut = new LoadSurveyResultController(
    loadSurveyByIdStub,
    loadSurveyResultStub,
  )

  return {
    sut,
    loadSurveyByIdStub,
    loadSurveyResultStub,
  }
}

describe('LoadSurveyResult Controller', () => {
  it('should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()

    const loadSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')

    await sut.handle(mockRequest())

    expect(loadSpy).toHaveBeenCalledWith('any_id')
  })

  it('should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()

    jest
      .spyOn(loadSurveyByIdStub, 'loadById')
      .mockReturnValueOnce(Promise.resolve(null))

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')))
  })

  it('should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()

    jest
      .spyOn(loadSurveyByIdStub, 'loadById')
      .mockImplementationOnce(throwError)

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('should call LoadSurveyResult w with correct values', async () => {
    const { sut, loadSurveyResultStub } = makeSut()

    const loadSpy = jest.spyOn(loadSurveyResultStub, 'load')

    await sut.handle(mockRequest())

    expect(loadSpy).toHaveBeenCalledWith('any_id')
  })
})
