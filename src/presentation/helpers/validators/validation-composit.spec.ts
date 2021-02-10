import { MissingParamError } from '../../erros'
import { Validation } from './validation'
import { ValidationComposit } from './validation-composit'

interface SutTypes {
  sut: ValidationComposit;
  validationStub: Validation
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  return new ValidationStub()
}

const makeSut = ():SutTypes => {
  const validationStub = makeValidation()
  const sut = new ValidationComposit([validationStub])

  return {
    validationStub,
    sut
  }
}

describe('Validation Composit', () => {
  it('should return an error if any validation fails', () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })

    expect(error).toEqual(new MissingParamError('field'))
  })
})
