import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { adapterMiddleware } from '../adapters/express/express-middleware-adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/addSurvey/add-survey-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  const adminAuth = adapterMiddleware(makeAuthMiddleware('admin'))

  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
}
