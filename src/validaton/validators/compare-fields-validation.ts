import { InvalidParamError } from '../../presentation/erros'
import { Validation } from '../../presentation/protocols'

export class ComparefieldsValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly fieldToCompareName: string) {}

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName)
    }
  }
}