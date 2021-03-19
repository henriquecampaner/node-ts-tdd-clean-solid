import { mockSurveyResultModel } from '@/domain/test'
import { DbLoadSurveyResult } from './load-survey-result'
import {
  SurveyResultModel,
  LoadSurveyRepository,
} from './load-survey-result-protocols'

const mockLoadSurveyResultRepository = (): LoadSurveyRepository => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyRepository {
    async loadBySurveyId(surveyId: string): Promise<SurveyResultModel> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }

  return new LoadSurveyResultRepositoryStub()
}

const makeSut = () => {
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
})
