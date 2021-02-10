import { MissingParamError } from '../../erros'
import { Validation } from './validation'
import { ValidationComposit } from './validation-composit'

describe('Validation Composit', () => {
  it('should return an error if any validation fails', () => {
    class ValidationStub implements Validation {
      validate (input: any): Error {
        return new MissingParamError('field')
      }
    }
    const validationStub = new ValidationStub()
    const sut = new ValidationComposit([validationStub])
    const error = sut.validate({ field: 'any_value' })

    expect(error).toEqual(new MissingParamError('field'))
  })
})
