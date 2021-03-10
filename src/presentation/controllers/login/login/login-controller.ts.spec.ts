import { AuthenticationModel } from '@/domain/useCases/authentication'
import { LoginController } from './login-controller'
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from '@/presentation/helpers/http/http-helper'
import { MissingParamError } from '@/presentation/erros'
import { Authentication, HttpRequest } from './login-controller-protocols'
import { Validation } from '../signup/signup-controller.ts-protocols'

type SutTypes = {
  sut: LoginController
  authenticationStub: Authentication
  validationStub: Validation
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeSut = (): SutTypes => {
  const authenticationStub = makeAuthentication()
  const validationStub = makeValidation()
  const sut = new LoginController(validationStub, authenticationStub)

  return {
    sut,
    authenticationStub,
    validationStub,
  }
}

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(authentication: AuthenticationModel): Promise<string> {
      return new Promise(resolve => resolve('any_token'))
    }
  }

  return new AuthenticationStub()
}

const makeHttpRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password',
  },
})

describe('Login Controller', () => {
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')

    await sut.handle(makeHttpRequest())

    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password',
    })
  })

  test('Should return 401 if invalid credential provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest
      .spyOn(authenticationStub, 'auth')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))

    const httpResponse = await sut.handle(makeHttpRequest())

    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest
      .spyOn(authenticationStub, 'auth')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      )

    const httpResponse = await sut.handle(makeHttpRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeHttpRequest())

    expect(httpResponse).toEqual(
      ok({
        accessToken: 'any_token',
      }),
    )
  })

  test('should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('should return 400 if validion returns an Error', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'))

    const httpResponse = await sut.handle(makeHttpRequest())

    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
