import { HttpRequest } from './add-survey-controller-protocols'
import { AddSurveyController } from './add-survey-controller'
import { Validation } from '../../../protocols'
import { badRequest } from '../../../helpers/http/http-helper'

const makeValidationStub = ():Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  return new ValidationStub()
}

interface SutTypes {
  sut: AddSurveyController;
  validationStub:Validation
}

const makeSut = ():SutTypes => {
  const validationStub = makeValidationStub()
  const sut = new AddSurveyController(validationStub)

  return {
    sut,
    validationStub
  }
}

const makeFakeRequest = ():HttpRequest => ({
  body: {
    quest: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      }
    ]
  }
})

describe('AddSurvey Controller', () => {
  it('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()

    const validateSpy = jest.spyOn(validationStub, 'validate')

    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  it('should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()

    jest.spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new Error())

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(badRequest(new Error()))
  })
})
