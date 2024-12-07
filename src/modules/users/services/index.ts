import { UserRepository } from '../repositories'
import bcrypt from 'bcrypt'
import { ApiError } from '../../../shared/utils/api-error'
import jwt from 'jsonwebtoken'
import Env from '../../../shared/utils/env'

export class UserService {
  static registerUser = async (username: string, password: string) => {
    try {
      const user = await UserRepository.getUserByUsername(username)
      if (user) throw new ApiError(400, 'User already exists')

      const hashedPassword = await bcrypt.hash(password, 12)
      const newUser = await UserRepository.createUser(username, hashedPassword)

      const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        Env.get<string>('SECRET'),
        { expiresIn: '10d' },
      )

      return { newUser, token }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error // Preserve existing ApiError
      }
      console.error('Unexpected error during user registration:', error)
      throw new ApiError(500, 'Internal server error')
    }
  }

  static loginUser = async (username: string, password: string) => {
    try {
      const user = await UserRepository.getUserByUsername(username)
      if (!user)
        throw new ApiError(404, 'User does not exist. Create an account')

      const isPassword = await bcrypt.compare(password, user.password)
      if (!isPassword) throw new ApiError(404, 'Invalid email or password')

      const token = jwt.sign(
        { id: user.id, email: user.email },
        Env.get<string>('SECRET'),
        { expiresIn: '10d' },
      )

      return { user, token }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error // Preserve existing ApiError
      }
      console.error('Unexpected error during user registration:', error)
      throw new ApiError(500, 'Internal server error')
    }
  }

  static getAllUsers = async () => {
    try {
      return await UserRepository.getUsers()
    } catch (error) {
      throw new ApiError(400, 'Something went wrong')
    }
  }
}
