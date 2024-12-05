import express from 'express'
import IncidentRouter from '../../modules/incident/incident.routes'

const appRouter = express.Router()

appRouter.use('/incidents', IncidentRouter)

export const Router = appRouter
