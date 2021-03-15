import { AccountModel } from '@/domain/models/account'
import { mockAccountModel } from '@/domain/test'
import {
  AddAccount,
  AddAccountParams,
} from '@/domain/useCases/account/add-account'
import { LoadAccountByToken } from '@/domain/useCases/account/load-account-by-token'

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountParams): Promise<AccountModel> {
      return new Promise(resolve => resolve(mockAccountModel()))
    }
  }
  return new AddAccountStub()
}

export const mockLoadAccountByToken = () => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    load(accessToken: string, role?: string): Promise<AccountModel> {
      return new Promise(resolve =>
        resolve({
          email: 'any_mail@mail.com',
          id: 'any_id',
          name: 'any_name',
          password: 'any_password',
        }),
      )
    }
  }

  return new LoadAccountByTokenStub()
}
