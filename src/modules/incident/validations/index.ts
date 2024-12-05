import { z } from 'zod'

export const submitIncidentSchema = z.object({
  incident_desc: z.string(),
  city: z.string(),
  country: z.string(),
  date: z.date(),
  weather_report: z.record(z.any()),
  temperature: z.number(),
  humidity: z.number(),
  client_id: z.number(),
})

export type SubmitIncidentSchema = typeof submitIncidentSchema._type
