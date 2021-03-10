import {
  SurveyResultModel,
  SaveSurveyResultModel,
  SaveSurveyResultRepository,
} from './db-save-survey-result-protocols'

import MockDate from 'mockdate'
import { DbSaveResult } from './db-save-survey-result'

const makeFakeSurveyResult = (): SurveyResultModel => ({
  id: 'any_id',
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date(),
})

const makeFakeSurveyResultData = (): SaveSurveyResultModel =>
  Object.assign({}, makeFakeSurveyResult(), {
    id: 'any_id',
  })

const makeSaveResultRepositoryStub = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return new Promise(resolve => resolve(makeFakeSurveyResult()))
    }
  }

  return new SaveSurveyResultRepositoryStub()
}

type SutTypes = {
  sut: DbSaveResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveResultRepositoryStub()
  const sut = new DbSaveResult(saveSurveyResultRepositoryStub)

  return {
    saveSurveyResultRepositoryStub,
    sut,
  }
}

describe('DbAddSurvey UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should call saveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()

    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')

    await sut.save(makeFakeSurveyResultData())

    expect(saveSpy).toHaveBeenCalledWith(makeFakeSurveyResultData())
  })
})
