import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

describe('Jwt Adapter', () => {
  it('Should call sign with correct values', async () => {
    const sut = new JwtAdapter('secret')
    const signSpyt = jest.spyOn(jwt, 'sign')

    await sut.encrypt('any_id')

    expect(signSpyt).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })
})
