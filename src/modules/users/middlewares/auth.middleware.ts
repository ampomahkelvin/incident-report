import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import Logger from '../../../config/logger'
import Env from '../../../shared/utils/env'
import { ApiError } from '../../../shared/utils/api-error'
import { StatusCodes } from 'http-status-codes'

const _logger = new Logger('UserAuthMiddleware')
export class UserAuthMiddleware {
  static tokenGuard = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      _logger.log('[UserAuthMiddleware]::Checking for token')
      if (!req.headers.authorization) {
        return next(
            new ApiError(StatusCodes.UNAUTHORIZED, 'Auth token is missing'),
        )
      }

      const token: string = (req.headers.authorization || '').split(
        ' ',
      )[1] as string

      if (!token) {
        return next(
            new ApiError(StatusCodes.UNAUTHORIZED, 'Auth token is missing'),
        )
      }

      const user = jwt.verify(token, Env.get('SECRET'))
      //   const user = await TokenClass.verifyUserToken(token);
      if (!user) {
        return next(
          new ApiError(StatusCodes.NOT_FOUND, 'User not found')
        )
      }
      Object.assign(req, { user })
      return next()
    } catch (error) {
      _logger.error('[UserAuthMiddleware]::Error verifying token', error)
        return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Token not verified'));
    }
  }
}
