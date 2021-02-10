import { AccountModel } from '../../../domain/models/account'
import { AuthenticationModel } from '../../../domain/useCases/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository'
import { DbAuthentication } from './db-authentication'

const makeFakeAccount = ():AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any@email.com',
  password: 'any_password'
})

const makeLoadAccountByEmailRepository = ():LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

const makeFakeAuthentication = ():AuthenticationModel => ({
  email: 'any@email.com',
  password: 'any_password'
})

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = ():SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)

  return {
    sut,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAuthentication', () => {
  it('should call LoadAccountByEmailRepository with correct email', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')

    await sut.auth(makeFakeAuthentication())

    expect(loadSpy).toHaveBeenCalledWith('any@email.com')
  })

  it('should throw if LoadAccountByEmailRepository throws', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )

    const promise = sut.auth(makeFakeAuthentication())

    expect(promise).rejects.toThrow()
  })
})
