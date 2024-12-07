import { sqlQuest } from '../../../config/database'
import { userQueries } from '../queries'
import { ApiError } from '../../../shared/utils/api-error'

export class UserRepository {
  static createUser = async (username: string, password: string) => {
    try {
      return await sqlQuest.one(userQueries.createUser, [username, password])
    } catch (error) {
      return new ApiError(401, 'Something went wrong')
    }
  }

  static getUsers = async () => {
    try {
      return await sqlQuest.manyOrNone(userQueries.getAllUsers)
    } catch (error) {
      return new ApiError(401, 'Something went wrong')
    }
  }

  static getUserByUsername = async (username:string) => {
    try {
      return await sqlQuest.oneOrNone(userQueries.getUserByUsername, [username])
    } catch (error) {
      return new ApiError(401, 'Something went wrong')
    }
  }
}
