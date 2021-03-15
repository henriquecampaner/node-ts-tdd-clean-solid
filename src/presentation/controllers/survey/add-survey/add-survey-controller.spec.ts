import {
  HttpRequest,
  AddSurvey,
  Validation,
} from './add-survey-controller-protocols'
import { AddSurveyController } from './add-survey-controller'
import {
  badRequest,
  serverError,
  noContent,
} from '@/presentation/helpers/http/http-helper'
import MockDate from 'mockdate'
import { throwError } from '@/domain/test'
import { mockValidation, mockAddSurvey } from '@/presentation/test'

type SutTypes = {
  sut: AddSurveyController
  validationStub: Validation
  addSurveyStub: AddSurvey
}

const makeSut = (): SutTypes => {
  const addSurveyStub = mockAddSurvey()
  const validationStub = mockValidation()
  const sut = new AddSurveyController(validationStub, addSurveyStub)

  return {
    sut,
    validationStub,
    addSurveyStub,
  }
}

const mockFakeRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer',
      },
    ],
    date: new Date(),
  },
})

describe('AddSurvey Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()

    const validateSpy = jest.spyOn(validationStub, 'validate')

    const httpRequest = mockFakeRequest()

    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()

    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())

    const httpResponse = await sut.handle(mockFakeRequest())

    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  it('should call AddSurvey with correct values', async () => {
    const { sut, addSurveyStub } = makeSut()

    const addSpy = jest.spyOn(addSurveyStub, 'add')

    await sut.handle(mockFakeRequest())

    expect(addSpy).toHaveBeenCalledWith(mockFakeRequest().body)
  })

  it('should return Server Error if AddSurvey throws', async () => {
    const { sut, addSurveyStub } = makeSut()

    jest.spyOn(addSurveyStub, 'add').mockImplementationOnce(throwError)

    const httpResponse = await sut.handle(mockFakeRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('should returns 204 on success', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(mockFakeRequest())

    expect(httpResponse).toEqual(noContent())
  })
})
