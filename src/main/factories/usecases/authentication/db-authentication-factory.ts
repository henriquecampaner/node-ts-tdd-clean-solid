import env from '../../../config/env'

import { DbAuthentication } from '../../../../data/usecases/authentication/db-authentication'

import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/criptography/jwt/jwt-adapter'

export const makeDbAuthentication = ():DbAuthentication => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const bcryptAdapter = new BcryptAdapter(12)
  const accountMongoRepository = new AccountMongoRepository()

  return new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  )
}
