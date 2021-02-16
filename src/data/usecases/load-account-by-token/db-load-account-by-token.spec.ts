import { Decrypter } from '../../protocols/cryptography/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'

const makeDescrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    decrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('any_value'))
    }
  }

  return new DecrypterStub()
}

const makeSut = () => {
  const decrypterStub = makeDescrypterStub()
  const sut = new DbLoadAccountByToken(decrypterStub)

  return {
    sut,
    decrypterStub
  }
}

describe('DbLoadAccountByToken Usecase', () => {
  it('should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token')

    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
