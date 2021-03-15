import { DbLoadSurveys } from './db-load-surveys'
import MockDate from 'mockdate'
import { throwError, mockSurveysModel } from '@/domain/test'
import { mockLoadSurveysRepository } from '@/data/test'

const makeSut = () => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)

  return {
    sut,
    loadSurveysRepositoryStub,
  }
}

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  it('should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()

    const loadSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')

    await sut.load()

    expect(loadSpy).toHaveBeenCalled()
  })

  it('should throws if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()

    jest
      .spyOn(loadSurveysRepositoryStub, 'loadAll')
      .mockImplementationOnce(throwError)
    const promise = sut.load()

    await expect(promise).rejects.toThrow()
  })

  it('should return a list of Surveys on sucess', async () => {
    const { sut } = makeSut()

    const surveys = await sut.load()

    expect(surveys).toEqual(mockSurveysModel())
  })
})
