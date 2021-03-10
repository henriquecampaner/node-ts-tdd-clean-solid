import {
  SurveyModel,
  LoadSurveyByIdRepository,
} from './db-load-survey-by-id-protocols'
import MockDate from 'mockdate'
import { DbLoadSurveyById } from './db-load-survey-by-id'

const makeFakeSurvey = (): SurveyModel => {
  return {
    id: 'other_id',
    question: 'other_question',
    answers: [
      {
        image: 'other_image',
        answer: 'other_answer',
      },
    ],
    date: new Date(),
  }
}

const makeLoadSurveyByIdRepositoryStub = () => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    loadById(id: string): Promise<SurveyModel> {
      return new Promise(resolve => resolve(makeFakeSurvey()))
    }
  }

  return new LoadSurveyByIdRepositoryStub()
}

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = makeLoadSurveyByIdRepositoryStub()
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
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      )

    const promise = sut.loadById('any_id')

    await expect(promise).rejects.toThrow()
  })

  it('should return a Survey on sucess', async () => {
    const { sut } = makeSut()

    const surveys = await sut.loadById('any_id')

    expect(surveys).toEqual(makeFakeSurvey())
  })
})
