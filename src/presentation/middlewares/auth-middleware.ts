import { LoadAccountByToken } from '../../domain/useCases/load-account-by-token'
import { AccessDeniedError } from '../erros'
import { forbidden, ok } from '../helpers/http/http-helper'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  constructor (private readonly loadAccountByToken: LoadAccountByToken) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      const account = await this.loadAccountByToken.load(accessToken)

      if (account) {
        return ok({ account_id: account.id })
      }
    }

    return forbidden(new AccessDeniedError())
  }
}
