import { throwError, mockAuthentication } from '@/domain/test'
import {
  mockCompare,
  mockEncrypter,
  mockLoadAccountByEmailRepository,
  mockUpdateAccessTokenRepository,
} from '@/data/test'
import { DbAuthentication } from './db-authentication'
import {
  LoadAccountByEmailRepository,
  HashCompare,
  Encrypter,
  UpdateAccessTokenRepository,
} from './db-authentication-protocols'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashCompareStub: HashCompare
  encrypterStub: Encrypter
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const hashCompareStub = mockCompare()
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const encrypterStub = mockEncrypter()
  const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepository()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    encrypterStub,
    updateAccessTokenRepositoryStub,
  )

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    encrypterStub,
    updateAccessTokenRepositoryStub,
  }
}

describe('DbAuthentication', () => {
  it('should call LoadAccountByEmailRepository with correct email', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')

    await sut.auth(mockAuthentication())

    expect(loadSpy).toHaveBeenCalledWith('any@email.com')
  })

  it('should throw if LoadAccountByEmailRepository throws', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = makeSut()
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockImplementationOnce(throwError)

    const promise = sut.auth(mockAuthentication())

    expect(promise).rejects.toThrow()
  })

  it('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { loadAccountByEmailRepositoryStub, sut } = makeSut()
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(null)

    const accessToken = await sut.auth(mockAuthentication())

    expect(accessToken).toBeNull()
  })

  it('should call HashCompare with correct values', async () => {
    const { hashCompareStub, sut } = makeSut()
    const compareSpy = jest.spyOn(hashCompareStub, 'compare')

    await sut.auth(mockAuthentication())

    expect(compareSpy).toHaveBeenCalledWith('any_password', 'any_password')
  })

  it('should throw if HashCompare throws', async () => {
    const { hashCompareStub, sut } = makeSut()
    jest.spyOn(hashCompareStub, 'compare').mockImplementationOnce(throwError)

    const promise = sut.auth(mockAuthentication())

    expect(promise).rejects.toThrow()
  })

  it('should return null if HashCompare returns false', async () => {
    const { hashCompareStub, sut } = makeSut()
    jest
      .spyOn(hashCompareStub, 'compare')
      .mockReturnValueOnce(Promise.resolve(false))

    const accessToken = await sut.auth(mockAuthentication())

    expect(accessToken).toBeNull()
  })

  it('should call Encrypter with correct id', async () => {
    const { encrypterStub, sut } = makeSut()
    const genterateSpy = jest.spyOn(encrypterStub, 'encrypt')

    await sut.auth(mockAuthentication())

    expect(genterateSpy).toHaveBeenCalledWith('any_id')
  })

  it('should throw if Encrypter throws', async () => {
    const { encrypterStub, sut } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(throwError)

    const promise = sut.auth(mockAuthentication())

    expect(promise).rejects.toThrow()
  })

  it('should return token if succeed', async () => {
    const { sut } = makeSut()

    const accessToken = await sut.auth(mockAuthentication())

    expect(accessToken).toBe('any_token')
  })

  it('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()

    const updateSpy = jest.spyOn(
      updateAccessTokenRepositoryStub,
      'updateAccessToken',
    )

    await sut.auth(mockAuthentication())
    expect(updateSpy).toBeCalledWith('any_id', 'any_token')
  })

  it('should throw if UpdateAccessTokenRepository throws', async () => {
    const { updateAccessTokenRepositoryStub, sut } = makeSut()
    jest
      .spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
      .mockImplementationOnce(throwError)

    const promise = sut.auth(mockAuthentication())

    expect(promise).rejects.toThrow()
  })
})
