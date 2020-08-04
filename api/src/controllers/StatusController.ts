import { Request, Response } from 'express'

export default class StatusController {
  async status(request: Request, response: Response) {
    return response.json({
      status: true,
    })
  }
}
