import { SignUpController } from '../../../../../presentation/controllers/login/signup/signup-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeSignupValidation } from './signup-validation-factory'
import { makeDbAddAccount } from '../../../usecases/account/add-account/db-add-accout-factory'
import { makeDbAuthentication } from '../../../usecases/account/authentication/db-authentication-factory'
import { makeLogDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeSignUpController = ():Controller => {
  const controller = new SignUpController(
    makeDbAddAccount(), makeSignupValidation(), makeDbAuthentication())

  return makeLogDecorator(controller)
}
