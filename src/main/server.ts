import 'module-alias/register'
import env from './config/env'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () =>
      console.log(`server running at http://localhost:${env.port}`))
  })
  .catch(error => {
    console.error(error)
  })
