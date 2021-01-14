import { ComparefieldsValidation } from '../../presentation/helpers/validators/compare-fields-validation'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../presentation/helpers/validators/validation'
import { ValidationComposit } from '../../presentation/helpers/validators/validation-composit'
import { makeSignupValidation } from './signup-validation'

jest.mock('../../presentation/helpers/validators/validation-composit')

describe('SignUpValidationFactory', () => {
  test('Should call ValidationComposit with all validation', () => {
    makeSignupValidation()
    const validations: Validation[] = []

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new ComparefieldsValidation('password', 'passwordConfirmation'))

    expect(ValidationComposit).toHaveBeenCalledWith(validations)
  })
})
