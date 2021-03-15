import { AccountModel } from '@/domain/models/account'
import { AddAccountParams } from '@/domain/useCases/account/add-account'

export interface AddAccountRepository {
  add(account: AddAccountParams): Promise<AccountModel>
}
