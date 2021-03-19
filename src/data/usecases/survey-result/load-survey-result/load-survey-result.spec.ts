import { DbLoadSurveyResult } from './load-survey-result'
import { LoadSurveyRepository } from './load-survey-result-protocols'
import { mockLoadSurveyResultRepository } from '@/data/test/mock-db-survey-result'
import { throwError } from '@/domain/test'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositoryStub: LoadSurveyRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub)

  return {
    sut,
    loadSurveyResultRepositoryStub,
  }
}

describe('DbLoadSurveyResult useCase', () => {
  it('should call LoadSurveyResultRepository with correct surveyId', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    const loadSurveySpy = jest.spyOn(
      loadSurveyResultRepositoryStub,
      'loadBySurveyId',
    )

    await sut.load('any_survey_id')

    expect(loadSurveySpy).toHaveBeenCalledWith('any_survey_id')
  })

  it('should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest
      .spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockImplementationOnce(throwError)

    const promise = sut.load('any_survey_id')

    expect(promise).rejects.toThrow()
  })
})
