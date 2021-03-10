import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-survey-repository'
import { DbLoadSurveys } from './db-load-surveys'
import MockDate from 'mockdate'

const makeFakeSurveys = (): SurveyModel[] => {
  return [
    {
      id: 'any_id',
      question: 'any_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer',
        },
      ],
      date: new Date(),
    },
    {
      id: 'other_id',
      question: 'other_question',
      answers: [
        {
          image: 'other_image',
          answer: 'other_answer',
        },
      ],
      date: new Date(),
    },
  ]
}

const makeLoadSurveysRepositoryStub = () => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    loadAll(): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(makeFakeSurveys()))
    }
  }

  return new LoadSurveysRepositoryStub()
}

const makeSut = () => {
  const loadSurveysRepositoryStub = makeLoadSurveysRepositoryStub()
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
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      )

    const promise = sut.load()

    await expect(promise).rejects.toThrow()
  })

  it('should return a list of Surveys on sucess', async () => {
    const { sut } = makeSut()

    const surveys = await sut.load()

    expect(surveys).toEqual(makeFakeSurveys())
  })
})
