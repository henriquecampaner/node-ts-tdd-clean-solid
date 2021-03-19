import {
  LoadSurveyById,
  HttpRequest,
} from './load-survey-result-controller-protocols'
import { mockLoadSurveyById } from '@/presentation/test'
import { LoadSurveyResultController } from './load-survey-result-controller'

const mockRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_id',
  },
})

type sutTypes = {
  loadSurveyByIdStub: LoadSurveyById
  sut: LoadSurveyResultController
}

const makeSut = (): sutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById()
  const sut = new LoadSurveyResultController(loadSurveyByIdStub)

  return {
    sut,
    loadSurveyByIdStub,
  }
}

describe('LoadSurveyResult Controller', () => {
  it('should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()

    const loadSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')

    await sut.handle(mockRequest())

    expect(loadSpy).toHaveBeenCalledWith('any_id')
  })
})
