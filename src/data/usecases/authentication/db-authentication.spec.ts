import { AccountModel } from '../../../domain/models/account'
import { AuthenticationModel } from '../../../domain/useCases/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'
import { DbAuthentication } from './db-authentication'
import { HashCompare } from '../../protocols/cryptography/hash-compare'
import { TokenGenerator } from '../../protocols/cryptography/token-generator'
import { UpdateAccessTokenRepository } from '../../protocols/db/update-access-token-repository'

const makeFakeAccount = ():AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any@email.com',
  password: 'hashed_password'
})

const makeLoadAccountByEmailRepository = ():LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

const makeHashCompare = ():HashCompare => {
  class HashCompareStub implements HashCompare {
    async compare (value: string, hash: string): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }

  return new HashCompareStub()
}

const makeFakeAuthentication = ():AuthenticationModel => ({
  email: 'any@email.com',
  password: 'any_password'
})

const makeTokenGenerator = ():TokenGenerator => {
  class TokenGeneratorStub implements TokenGenerator {
    async generate (id: string): Promise<string> {
      return new Promise(resolve => resolve('any_token'))
    }
  }

  return new TokenGeneratorStub()
}

const makeupdateAccessTokenRepository = ():UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async update (id: string, token: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }

  return new UpdateAccessTokenRepositoryStub()
}

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashCompareStub: HashCompare
  tokenGeneratorStub: TokenGenerator
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository

}

const makeSut = ():SutTypes => {
  const hashCompareStub = makeHashCompare()
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const tokenGeneratorStub = makeTokenGenerator()
  const updateAccessTokenRepositoryStub = makeupdateAccessTokenRepository()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub
  )

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub
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

  it('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(null)

    const accessToken = await sut.auth(makeFakeAuthentication())

    expect(accessToken).toBeNull()
  })

  it('should call HashCompare with correct values', async () => {
    const { hashCompareStub, sut } = makeSut()
    const compareSpy = jest.spyOn(hashCompareStub, 'compare')

    await sut.auth(makeFakeAuthentication())

    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  it('should throw if HashCompare throws', async () => {
    const { hashCompareStub, sut } = makeSut()
    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )

    const promise = sut.auth(makeFakeAuthentication())

    expect(promise).rejects.toThrow()
  })

  it('should return null if HashCompare returns false', async () => {
    const { hashCompareStub, sut } = makeSut()
    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(
      new Promise(resolve => resolve(false))
    )

    const accessToken = await sut.auth(makeFakeAuthentication())

    expect(accessToken).toBeNull()
  })

  it('should call TokenGenerator with correct id', async () => {
    const { tokenGeneratorStub, sut } = makeSut()
    const genterateSpy = jest.spyOn(tokenGeneratorStub, 'generate')

    await sut.auth(makeFakeAuthentication())

    expect(genterateSpy).toHaveBeenCalledWith('any_id')
  })

  it('should throw if TokenGenerator throws', async () => {
    const { tokenGeneratorStub, sut } = makeSut()
    jest.spyOn(tokenGeneratorStub, 'generate').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )

    const promise = sut.auth(makeFakeAuthentication())

    expect(promise).rejects.toThrow()
  })

  it('should return token if succeed', async () => {
    const { sut } = makeSut()

    const accessToken = await sut.auth(makeFakeAuthentication())

    expect(accessToken).toBe('any_token')
  })

  it('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()

    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'update')

    await sut.auth(makeFakeAuthentication())
    expect(updateSpy).toBeCalledWith('any_id', 'any_token')
  })
})
