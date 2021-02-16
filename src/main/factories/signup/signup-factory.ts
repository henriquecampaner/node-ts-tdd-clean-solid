import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeSignupValidation } from './signup-validation-factory'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { JwtAdapter } from '../../../infra/criptography/jwt/jwt-adapter'
import env from '../../config/env'

export const makeSignUpController = ():Controller => {
  const accountMongoRepository = new AccountMongoRepository()
  const salt = 12
  const hasher = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)

  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    hasher,
    jwtAdapter,
    accountMongoRepository
  )

  const addAccount = new DbAddAccount(hasher, accountMongoRepository)
  const signUpController = new SignUpController(
    addAccount, makeSignupValidation(), dbAuthentication)

  const logMongoRepository = new LogMongoRepository()

  return new LogControllerDecorator(signUpController, logMongoRepository)
}
