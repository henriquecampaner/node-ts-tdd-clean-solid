import { Validation } from '../../protocols/validation'

export class ValidationComposit implements Validation {
  private readonly validations: Validation[]

  constructor (validations: Validation[]) {
    this.validations = validations
  }

  validate (input: any): Error {
    for (const validation of this.validations) {
      const hasError = validation.validate(input)
      if (hasError) {
        return hasError
      }
    }
  }
}
