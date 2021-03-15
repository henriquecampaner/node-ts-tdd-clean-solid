import {
  Authentication,
  AuthenticationParams,
} from '@/domain/useCases/account/authentication'

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(authentication: AuthenticationParams): Promise<string> {
      return Promise.resolve('any_token')
    }
  }

  return new AuthenticationStub()
}
