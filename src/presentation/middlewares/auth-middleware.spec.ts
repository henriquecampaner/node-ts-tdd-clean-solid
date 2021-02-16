import { forbidden, ok } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../erros'
import { AuthMiddleware } from './auth-middleware'

import { LoadAccountByToken } from '../../domain/useCases/load-account-by-token'
import { AccountModel } from '../../domain/models/account'
import { HttpRequest } from '../protocols'

const makeLoadAccountByTokenStub = () => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    load (accessToken: string, role?: string): Promise<AccountModel> {
      return new Promise(resolve => resolve({
        email: 'any_mail@mail.com',
        id: 'any_id',
        name: 'any_name',
        password: 'any_password'
      }))
    }
  }

  return new LoadAccountByTokenStub()
}

interface SutTypes {
  sut: AuthMiddleware;
  loadAccountByTokenStub: LoadAccountByToken
}

const makeSut = ():SutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByTokenStub()
  const sut = new AuthMiddleware(loadAccountByTokenStub)

  return {
    sut,
    loadAccountByTokenStub
  }
}

const makeFakeRequest = ():HttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

describe('Auth Middleware', () => {
  test('should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('should call loadAccountByToken with correct accessToken', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()

    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')

    await sut.handle(makeFakeRequest())

    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })

  test('should return 403 if loadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()

    jest.spyOn(loadAccountByTokenStub, 'load')
      .mockReturnValueOnce(new Promise(resolve => resolve(null)))

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('should return 200 if loadAccountByToken returns an account', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(ok({
      account_id: 'any_id'
    }))
  })
})
