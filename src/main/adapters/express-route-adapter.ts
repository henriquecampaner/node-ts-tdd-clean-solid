import { Controller, HttpRequest } from '../../presentation/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const httpResquest:HttpRequest = {
      body: request.body
    }

    const httpResponse = await controller.handle(httpResquest)

    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
