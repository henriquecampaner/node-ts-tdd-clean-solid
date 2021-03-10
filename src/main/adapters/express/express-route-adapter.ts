import { Controller, HttpRequest } from '@/presentation/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const httpResquest: HttpRequest = {
      body: request.body,
    }

    const httpResponse = await controller.handle(httpResquest)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      response.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      response.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      })
    }
  }
}
