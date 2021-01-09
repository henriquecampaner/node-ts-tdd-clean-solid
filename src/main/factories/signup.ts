import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeSignUpController = ():SignUpController => {
  const emailValidator = new EmailValidatorAdapter()

  const accountMongoRepository = new AccountMongoRepository()
  const salt = 12
  const encrypter = new BcryptAdapter(salt)

  const addAccount = new DbAddAccount(encrypter, accountMongoRepository)

  return new SignUpController(emailValidator, addAccount)
}
