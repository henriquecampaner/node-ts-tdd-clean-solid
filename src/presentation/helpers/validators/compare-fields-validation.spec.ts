import { InvalidParamError } from '../../erros'
import { ComparefieldsValidation } from './compare-fields-validation'

const makeSut = ():ComparefieldsValidation => {
  return new ComparefieldsValidation('field', 'fieldToCompare')
}

describe('CompareFields Validation', () => {
  it('should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()

    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'different_value'
    })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  it('should not return if validation succeeds', () => {
    const sut = makeSut()

    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'any_value'
    })
    expect(error).toBeFalsy()
  })
})
