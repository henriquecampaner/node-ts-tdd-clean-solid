import { AccountModel } from '@/domain/models/account'
import { AddAccountParams } from '@/domain/useCases/account/add-account'
import { AuthenticationParams } from '@/presentation/controllers/login/login/login-controller-protocols'

export const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
})

export const mockAccountModel = (): AccountModel =>
  Object.assign({}, mockAddAccountParams(), {
    id: 'any_id',
  })

export const mockAuthentication = (): AuthenticationParams => ({
  email: 'any@email.com',
  password: 'any_password',
})
