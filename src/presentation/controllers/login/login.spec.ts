import { LoginController } from './login'
import { badRequest } from '../../helpers/http-helper'
import { InvalidParamError, MissingParamError } from '../../erros'
import { EmailValidator } from '../signup/signup-protocols'

interface SutTypes {
  sut: LoginController
  emailValidatorStub: EmailValidator
}

const makeEmailValidator = ():EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new LoginController(emailValidatorStub)

  return {
    sut,
    emailValidatorStub
  }
}

const makeHttpRequest = () => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

describe('Login Controller', () => {
  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should return 400 invalid email provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpResponse = await sut.handle(makeHttpRequest())

    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Should call emailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    await sut.handle(makeHttpRequest())

    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
