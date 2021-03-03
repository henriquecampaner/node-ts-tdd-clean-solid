import {
  RequiredFieldValidation,
  ValidationComposit
} from '@/validaton/validators'
import { Validation } from '@/presentation/protocols/validation'
import { makeAddSurveyalidation } from './add-survey-validation-factory'

jest.mock('@/validaton/validators/validation-composit')

describe('AddSurveyValidation Factory', () => {
  test('Should call ValidationComposit with all validations', () => {
    makeAddSurveyalidation()
    const validations: Validation[] = []

    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposit).toHaveBeenCalledWith(validations)
  })
})
