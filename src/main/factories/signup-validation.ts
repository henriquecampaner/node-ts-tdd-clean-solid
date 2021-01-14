import { ComparefieldsValidation } from '../../presentation/helpers/validators/compare-fields-validation'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../presentation/helpers/validators/validation'
import { ValidationComposit } from '../../presentation/helpers/validators/validation-composit'

export const makeSignupValidation = ():ValidationComposit => {
  const validations: Validation[] = []

  for (const field of
    ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new ComparefieldsValidation('password', 'passwordConfirmation'))

  return new ValidationComposit(validations)
}
