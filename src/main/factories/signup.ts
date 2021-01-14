import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorators/log'
import { makeSignupValidation } from './signup-validation'

export const makeSignUpController = ():Controller => {
  const accountMongoRepository = new AccountMongoRepository()
  const salt = 12
  const encrypter = new BcryptAdapter(salt)

  const addAccount = new DbAddAccount(encrypter, accountMongoRepository)
  const signUpController = new SignUpController(
    addAccount, makeSignupValidation())

  const logMongoRepository = new LogMongoRepository()

  return new LogControllerDecorator(signUpController, logMongoRepository)
}
