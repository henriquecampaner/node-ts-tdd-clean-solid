import { Encrypter } from '../../../data/protocols/cryptography/encrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  private readonly secret: string
  constructor (secret: string) {
    this.secret = secret
  }

  async encrypt (id: string): Promise<string> {
    const accessToken = await jwt.sign({ id }, this.secret)
    return accessToken
  }
}
