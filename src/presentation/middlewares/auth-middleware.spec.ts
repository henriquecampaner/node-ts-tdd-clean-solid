import { forbidden } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../erros'
import { AuthMiddleware } from './auth-middleware'

import { LoadAccountByToken } from '../../domain/useCases/load-account-by-token'
import { AccountModel } from '../../domain/models/account'

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

describe('Auth Middleware', () => {
  test('should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('should call loadAccountByToken with correct accessToken', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()

    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')

    await sut.handle({
      headers: {
        'x-access-token': 'any_token'
      }
    })

    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
})
