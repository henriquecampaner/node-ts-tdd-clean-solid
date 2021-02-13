import { HttpRequest, HttpResponse, Controller, AddAccount } from './signup-controller.ts-protocols'
import { badRequest, serverError, ok } from '../../helpers/http/http-helper'
import { Validation } from '../../protocols/validation'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationError = this.validation.validate(httpRequest.body)

      if (validationError) {
        return badRequest(validationError)
      }

      const { name, email, password } = httpRequest.body

      const account = await this.addAccount.add({
        email,
        name,
        password
      })

      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
