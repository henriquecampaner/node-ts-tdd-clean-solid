import { EmailValidation, RequiredFieldValidation, ValidationComposit } from '../../../../../validaton/validators'
import { Validation } from '../../../../../presentation/protocols/validation'
import { EmailValidatorAdapter } from '../../../../../infra/validators/email-validator-adapter'

export const makeLoginValidation = ():ValidationComposit => {
  const validations: Validation[] = []

  for (const field of
    ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposit(validations)
}