import {
  forbidden,
  ok,
  serverError,
} from '@/presentation/helpers/http/http-helper'
import { AccessDeniedError } from '@/presentation/erros'
import { AuthMiddleware } from './auth-middleware'

import { LoadAccountByToken, HttpRequest } from './authmiddle-protocols'
import { throwError } from '@/domain/test'
import { mockLoadAccountByToken } from '@/presentation/test'

type SutTypes = {
  sut: AuthMiddleware
  loadAccountByTokenStub: LoadAccountByToken
}

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenStub = mockLoadAccountByToken()
  const sut = new AuthMiddleware(loadAccountByTokenStub, role)

  return {
    sut,
    loadAccountByTokenStub,
  }
}

const mockRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token',
  },
})

describe('Auth Middleware', () => {
  test('should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('should call loadAccountByToken with correct accessToken and role', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenStub } = makeSut(role)

    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')

    await sut.handle(mockRequest())

    expect(loadSpy).toHaveBeenCalledWith('any_token', role)
  })

  test('should return 403 if loadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()

    jest
      .spyOn(loadAccountByTokenStub, 'load')
      .mockReturnValueOnce(Promise.resolve(null))

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('should return 200 if loadAccountByToken returns an account', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(
      ok({
        account_id: 'any_id',
      }),
    )
  })

  test('should return 500 if loadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()

    jest
      .spyOn(loadAccountByTokenStub, 'load')
      .mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
