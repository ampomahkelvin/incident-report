const submitIncident = `
INSERT INTO "incidents" ("incident_desc", "city", "country", "date", "weather_report", "client_id") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
`

const getIncidents = `
SELECT * FROM "incidents" WHERE 
    ($1 IS NULL OR "city" = $1) AND
    ($2 IS NULL OR ("weather_report" -> 'main' ->>'temp')::FLOAT >= $2) AND
    ($3 IS NULL OR ("weather_report" -> 'main' ->>'temp')::FLOAT <= $3) AND
    ($4 IS NULL OR ("weather_report" -> 'main' ->>'humidity')::FLOAT >= $4) AND
    ($5 IS NULL OR ("weather_report" -> 'main' ->>'humidity')::FLOAT <= $5) 
`

const getIncidentByCountryName = `
SELECT * FROM "incidents" WHERE "country" = $1
`

export const incidentQueries = {
  submitIncident,
  getIncidents,
  getIncidentByCountryName,
}
