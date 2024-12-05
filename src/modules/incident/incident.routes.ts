import express from 'express'
import { IncidentController } from './incident.controller'

const router = express.Router()

router.post('/submit', IncidentController.submitIncident)
router.get('/', IncidentController.getIncidents)
router.get('/getBy/:countryName', IncidentController.getIncidentsByCountry)

export default router
