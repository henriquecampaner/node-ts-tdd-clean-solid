import { ComparefieldsValidation, EmailValidation, RequiredFieldValidation, ValidationComposit } from '../../../../../validaton/validators'
import { Validation } from '../../../../../presentation/protocols/validation'
import { EmailValidatorAdapter } from '../../../../../infra/validators/email-validator-adapter'

export const makeSignupValidation = ():ValidationComposit => {
  const validations: Validation[] = []

  for (const field of
    ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new ComparefieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposit(validations)
}
