import { LoadSurveysController } from './load-surveys-controller'
import { LoadSurveys, SurveyModel } from './load-surveys-controller-protocols'
import MockDate from 'mockdate'
import { noContent, ok, serverError } from '../../../helpers/http/http-helper'
const makeFakeSurveys = (): SurveyModel[] => {
  return [
    {
      id: 'any_id',
      question: 'any_question',
      answers: [{
        image: 'any_image',
        answer: 'any_answer'
      }],
      date: new Date()
    },
    {
      id: 'other_id',
      question: 'other_question',
      answers: [{
        image: 'other_image',
        answer: 'other_answer'
      }],
      date: new Date()
    }
  ]
}

const makeLoadSurveysStub = () => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return new Promise(resolve => resolve(makeFakeSurveys()))
    }
  }
  return new LoadSurveysStub()
}

interface SutTypes {
  sut: LoadSurveysController;
  loadSurveysStub: LoadSurveys
}

const makeSut = ():SutTypes => {
  const loadSurveysStub = makeLoadSurveysStub()
  const sut = new LoadSurveysController(loadSurveysStub)

  return {
    sut,
    loadSurveysStub
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')

    await sut.handle({})

    expect(loadSpy).toHaveBeenCalled()
  })

  it('should return 200 on success', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(ok(makeFakeSurveys()))
  })

  it('should return 204 if LoadSurveys is empty', async () => {
    const { sut, loadSurveysStub } = makeSut()

    jest.spyOn(loadSurveysStub, 'load')
      .mockReturnValueOnce(
        new Promise((resolve) => resolve([]))
      )

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(noContent())
  })

  it('should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
