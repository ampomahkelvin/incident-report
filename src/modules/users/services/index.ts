import { UserRepository } from '../repositories'
import bcrypt from 'bcrypt'
import { ApiError } from '../../../shared/utils/api-error'

export class UserService {
  static registerUser = async (username: string, password: string) => {
    try {
      const user = await UserRepository.getUserByUsername(username)
      if (user) return new ApiError(400, 'User already exists')

      const hashedPassword = await bcrypt.hash(password, 12)
      return await UserRepository.createUser(username, hashedPassword)
    } catch (error) {
      throw new ApiError(400, 'Something went wrong')
    }
  }

  static loginUser = async (username: string, password: string) => {
    try {
      const user = await UserRepository.getUserByUsername(username)
      if (!user) return new Error('User does not exist. Create an account')

      const isPassword = await bcrypt.compare(password, user.password)
      if (!isPassword) return new Error('Invalid email or password')
      return user
    } catch (error) {
      throw new ApiError(400, 'Something went wrong')
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
