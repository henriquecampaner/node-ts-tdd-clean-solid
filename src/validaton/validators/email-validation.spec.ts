import { InvalidParamError } from '@/presentation/erros'

import { EmailValidation } from './email-validation'
import { EmailValidator } from '../protocols/emailValidator'

type SutTypes = {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

// System Under Test
const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()

  const sut = new EmailValidation('email', emailValidatorStub)

  return {
    sut,
    emailValidatorStub,
  }
}
describe('Sign Up Controller', () => {
  test('should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.validate({ email: 'any_email@email.com' })
    expect(isValidSpy).toHaveBeenCalledWith('any_email@email.com')
  })

  test('should throw if  EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    expect(sut.validate).toThrow()
  })

  test('Should return an error if EmailValidator returns false', () => {
    const { emailValidatorStub, sut } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const error = sut.validate({ email: 'any_email' })

    expect(error).toEqual(new InvalidParamError('email'))
  })
})
