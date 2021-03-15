import { SignUpController } from '@/presentation/controllers/login/signup/signup-controller'
import { Controller } from '@/presentation/protocols'
import { makeDbAddAccount } from '@/main/factories/usecases/account/add-account/db-add-accout-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { makeLogDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeSignupValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(
    makeDbAddAccount(),
    makeSignupValidation(),
    makeDbAuthentication(),
  )

  return makeLogDecorator(controller)
}
