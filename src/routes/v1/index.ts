import express from 'express'
import IncidentRouter from '../../modules/incident/incident.routes'
import UserRouter from '../../modules/users/user.routes'

const appRouter = express.Router()

appRouter.use('/incidents', IncidentRouter)
appRouter.use('/users', UserRouter)

export const Router = appRouter
