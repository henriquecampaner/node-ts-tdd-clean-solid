import { SignUpController } from './signup-controller'
import {
  MissingParamError,
  ServerError,
  EmailInUseError,
} from '@/presentation/erros'
import {
  AddAccount,
  Validation,
  Authentication,
} from './signup-controller.ts-protocols'
import { HttpRequest } from '@/presentation/protocols'
import {
  ok,
  serverError,
  badRequest,
  forbidden,
} from '@/presentation/helpers/http/http-helper'
import { throwError } from '@/domain/test'
import {
  mockAuthentication,
  mockValidation,
  mockAddAccount,
} from '@/presentation/test'

type SutTypes = {
  sut: SignUpController
  addAccountStub: AddAccount
  validationStub: Validation
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const addAccountStub = mockAddAccount()
  const validationStub = mockValidation()
  const authenticationStub = mockAuthentication()

  const sut = new SignUpController(
    addAccountStub,
    validationStub,
    authenticationStub,
  )

  return {
    sut,
    addAccountStub,
    validationStub,
    authenticationStub,
  }
}

const mockResquest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  },
})

const mockHttpRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password',
  },
})

describe('Sign Up Controller', () => {
  test('should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(mockResquest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    })
  })

  test('should return 500 if an AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()

    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return Promise.reject(new Error())
    })
    const httpResponse = await sut.handle(mockResquest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockResquest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('should return 400 if validion returns an Error', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'))

    const httpResponse = await sut.handle(mockResquest())

    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')

    await sut.handle(mockHttpRequest())

    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password',
    })
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockHttpRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockResquest())

    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }))
  })

  test('Should return 403 if addAccount returns null', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(Promise.resolve(null))

    const httpResponse = await sut.handle(mockResquest())

    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })
})
