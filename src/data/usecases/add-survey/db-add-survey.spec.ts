import { AddSurveyModel, AddSurveyRepository } from './db-add-survey-protocols'
import { DbAddSurvey } from './db-add-survey'
import MockDate from 'mockdate'

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer',
    },
  ],
  date: new Date(),
})

const makeAddSurveyRepositoryStub = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    add(surveyData: AddSurveyModel): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }

  return new AddSurveyRepositoryStub()
}

type SutTypes = {
  sut: DbAddSurvey
  addSurveyRepositoryStub: AddSurveyRepository
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = makeAddSurveyRepositoryStub()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)

  return {
    addSurveyRepositoryStub,
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

  it('should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()

    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')

    await sut.add(makeFakeSurveyData())

    expect(addSpy).toHaveBeenCalledWith(makeFakeSurveyData())
  })

  it('should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()

    jest
      .spyOn(addSurveyRepositoryStub, 'add')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      )

    const promise = sut.add(makeFakeSurveyData())

    await expect(promise).rejects.toThrow()
  })
})
