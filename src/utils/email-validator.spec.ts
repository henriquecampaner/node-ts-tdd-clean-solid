import { EmailValidatorAdapter } from './email-validator'

describe('EmailValidator Adapter', () => {
  test('should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    const insValid = sut.isValid('invalid_email@mail.com')
    expect(insValid).toBe(false)
  })
})
