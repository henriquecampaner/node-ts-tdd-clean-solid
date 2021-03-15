import { LoadSurveyByIdRepository } from './db-load-survey-by-id-protocols'
import MockDate from 'mockdate'
import { DbLoadSurveyById } from './db-load-survey-by-id'
import { throwError, mockSurvey } from '@/domain/test'
import { mockLoadSurveyByIdRepository } from '@/data/test'

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub)

  return {
    sut,
    loadSurveyByIdRepositoryStub,
  }
}

describe('DbLoadSurveyById', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  it('should call LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()

    const loadSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')

    await sut.loadById('any_id')

    expect(loadSpy).toHaveBeenCalledWith('any_id')
  })

  it('should throws if DbLoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()

    jest
      .spyOn(loadSurveyByIdRepositoryStub, 'loadById')
      .mockImplementationOnce(throwError)

    const promise = sut.loadById('any_id')

    await expect(promise).rejects.toThrow()
  })

  it('should return a Survey on sucess', async () => {
    const { sut } = makeSut()

    const surveys = await sut.loadById('any_id')

    expect(surveys).toEqual(mockSurvey())
  })
})
