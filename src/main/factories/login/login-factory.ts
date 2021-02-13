import env from '../../config/env'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeLoginValidation } from './login-validation-factory'

import { Controller } from '../../../presentation/protocols'
import { LoginController } from '../../../presentation/controllers/login/login-controller'

import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'

import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt/jwt-adapter'

export const makeLoginController = ():Controller => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const bcryptAdapter = new BcryptAdapter(12)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  )

  const loginController = new LoginController(makeLoginValidation(), dbAuthentication)

  const logMongoRepository = new LogMongoRepository()

  return new LogControllerDecorator(loginController, logMongoRepository)
}
