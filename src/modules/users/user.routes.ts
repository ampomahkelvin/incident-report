import express from 'express'
import { UserController } from './user.controller'

const router = express.Router()

router.post('/register', UserController.createUser as any)
router.post('/login', UserController.loginUser as any)
router.get('/', UserController.getAllUsers)

export default router
