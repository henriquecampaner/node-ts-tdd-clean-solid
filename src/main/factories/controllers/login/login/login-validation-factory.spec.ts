import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposit
} from '@/validaton/validators'
import { Validation } from '@/presentation/protocols/validation'
import { EmailValidator } from '@/validaton/protocols/emailValidator'
import { makeLoginValidation } from './login-validation-factory'

jest.mock('../../../../../validaton/validators/validation-composit')

const makeEmailValidator = ():EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposit with all validation', () => {
    makeLoginValidation()
    const validations: Validation[] = []

    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposit).toHaveBeenCalledWith(validations)
  })
})
