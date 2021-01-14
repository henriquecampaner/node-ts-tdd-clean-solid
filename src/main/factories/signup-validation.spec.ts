import { ComparefieldsValidation } from '../../presentation/helpers/validators/compare-fields-validation'
import { EmailValidation } from '../../presentation/helpers/validators/email-validation'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../presentation/helpers/validators/validation'
import { ValidationComposit } from '../../presentation/helpers/validators/validation-composit'
import { EmailValidator } from '../../presentation/protocols/emailValidator'
import { makeSignupValidation } from './signup-validation'

jest.mock('../../presentation/helpers/validators/validation-composit')

const makeEmailValidator = ():EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('SignUpValidationFactory', () => {
  test('Should call ValidationComposit with all validation', () => {
    makeSignupValidation()
    const validations: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new ComparefieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposit).toHaveBeenCalledWith(validations)
  })
})
