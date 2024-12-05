import { incidentQueries } from '../queries'
import { SubmitIncidentSchema } from '../validations'
import { sqlQuest } from '../../../config/database'
import { ApiError } from '../../../shared/utils/api-error'

export default class IncidentRepository {
  static submitIncident = async (data: SubmitIncidentSchema) => {
    try {
      const {
        incident_desc,
        city,
        country,
        date,
        weather_report,
        temperature,
        humidity,
        client_id,
      } = data

      return await sqlQuest.one(incidentQueries.submitIncident, [
        incident_desc,
        city,
        country,
        date,
        weather_report,
        temperature,
        humidity,
        client_id,
      ])
    } catch (error) {
      throw new ApiError(400, error.message)
    }
  }

  static getIncidents = async ({
    city,
    minTemp,
    maxTemp,
    minHumidity,
    maxHumidity,
  }: {
    city: string | null
    minTemp: number | null
    maxTemp: number | null
    minHumidity: number | null
    maxHumidity: number | null
  }) => {
    try {
      return await sqlQuest.manyOrNone(incidentQueries.getIncidents, [
        city || null,
        minTemp || null,
        maxTemp || null,
        minHumidity || null,
        maxHumidity || null,
      ])
    } catch (error) {
      throw new ApiError(400, error.message)
    }
  }

  static getIncidentByCountryName = async (countryName: string) => {
    try {
      return await sqlQuest.manyOrNone(
        incidentQueries.getIncidentByCountryName,
        [countryName],
      )
    } catch (error) {
      throw new ApiError(400, error.message)
    }
  }
}
