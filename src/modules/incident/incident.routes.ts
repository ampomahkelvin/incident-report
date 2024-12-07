import express from 'express'
import { IncidentController } from './incident.controller'
import { UserAuthMiddleware } from '../users/middlewares/auth.middleware'

const router = express.Router()

router.post(
  '/submit',
  UserAuthMiddleware.tokenGuard,
  IncidentController.submitIncident,
)
router.get('/', IncidentController.getIncidents)
router.get('/getBy/:countryName', IncidentController.getIncidentsByCountry)

export default router
