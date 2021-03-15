import { AccountModel } from '@/domain/models/account'
import { AddAccountModel } from '@/domain/useCases/account/add-account'

export interface AddAccountRepository {
  add(account: AddAccountModel): Promise<AccountModel>
}
