import { SaveSurveyResultRepository } from './db-save-survey-result-protocols'

import MockDate from 'mockdate'
import { DbSaveResult } from './db-save-survey-result'
import {
  throwError,
  mockSaveSurveyResultParams,
  mockSurveyResultModel,
} from '@/domain/test'
import { mockSaveResultRepository } from '@/data/test'

type SutTypes = {
  sut: DbSaveResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveResultRepository()
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

    await sut.save(mockSaveSurveyResultParams())

    expect(saveSpy).toHaveBeenCalledWith(mockSaveSurveyResultParams())
  })

  it('should throw if saveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()

    jest
      .spyOn(saveSurveyResultRepositoryStub, 'save')
      .mockImplementationOnce(throwError)
    const promise = sut.save(mockSaveSurveyResultParams())

    await expect(promise).rejects.toThrow()
  })

  it('should return a surveyResult on success', async () => {
    const { sut } = makeSut()

    const surveyResult = await sut.save(mockSaveSurveyResultParams())

    expect(surveyResult).toEqual(mockSurveyResultModel())
  })
})
