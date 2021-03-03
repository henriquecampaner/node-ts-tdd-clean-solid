import { Validation } from '@/presentation/protocols'

export class ValidationComposit implements Validation {
  constructor (private readonly validations: Validation[]) {}

  validate (input: any): Error {
    for (const validation of this.validations) {
      const hasError = validation.validate(input)
      if (hasError) {
        return hasError
      }
    }
  }
}
