import { Request, Response } from 'express'
import { ApiError } from '../../shared/utils/api-error'
import { UserService } from './services'

export class UserController {
  static createUser = async (req: Request, res: Response) => {
    const { username, password } = req.body

    try {
      if (!username || !password) {
        new ApiError(400, 'Missing data')
      }

      const newUser = await UserService.registerUser(username, password)

      return res.status(201).json({
        status: 201,
        message: 'User created',
        user: newUser,
      })
    } catch (error) {
      throw new ApiError(400, 'User registration failed')
    }
  }

  static loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body

    try {
      if (!username || !password)
        res.json({ status: 400, message: 'Missing fields' })

      const user = await UserService.loginUser(username, password)

      if (!user)
        res.json({ status: 400, message: 'Username or password is incorrect' })

      res.json({
        status: 200,
        message: 'Login successful',
        user,
      })
    } catch (error) {
      throw new ApiError(400, 'User login failed')
    }
  }

  static getAllUsers = async (_req: Request, res: Response) => {
    try {
      const users = await UserService.getAllUsers()
      res.status(200).json({
        status: 200,
        message: 'Successfully got all users',
        length: users.length,
        users,
      })
    } catch (error) {
      console.log(error)
      res.json({
        status: 400,
        message: 'Something went wrong',
      })
    }
  }
}
