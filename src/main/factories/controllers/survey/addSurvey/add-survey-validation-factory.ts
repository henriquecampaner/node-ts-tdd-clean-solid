import { RequiredFieldValidation, ValidationComposit } from '@/validaton/validators'
import { Validation } from '@/presentation/protocols/validation'

export const makeAddSurveyalidation = ():ValidationComposit => {
  const validations: Validation[] = []

  for (const field of
    ['question', 'answers']) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposit(validations)
}
