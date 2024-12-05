import { NextFunction, Request, Response } from 'express'
import { submitIncidentSchema } from './validations'
import { IncidentService } from './services'
import { ApiError } from '../../shared/utils/api-error'

export class IncidentController {
  static submitIncident = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      // Validate the request body using submitIncidentSchema
      const body = req.body
      const { incident_desc, city, country, client_id } = body

      const currentDate = new Date()
      const weather_report = await IncidentService.getWeatherData(city)
      // console.log(weather_report)

      // TODO: Handle missing fields error better here
      if (
        !incident_desc ||
        !weather_report ||
        !city ||
        !country ||
        !client_id
      ) {
        next(new ApiError(400, 'Missing fields'))
      }

      if (!weather_report) {
        next(new ApiError(400, 'Weather report not found from API'))
      }

      const temperature = weather_report.main.temp
      const humidity = weather_report.main.humidity

      const newIncident = submitIncidentSchema.parse(
        await IncidentService.submitIncident({
          incident_desc,
          city,
          country,
          date: currentDate,
          weather_report,
          temperature,
          humidity,
          client_id,
        }),
      )

      res.json({
        status: 201,
        message: 'Incident Report submitted',
        incident: newIncident,
      })
    } catch (error) {
      next(new ApiError(400, error.message))
    }
  }

  static getIncidents = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { city, minTemp, maxTemp, minHumidity, maxHumidity } = req.query

      // Get Filters
      const incidents = await IncidentService.getIncidents({
        city: city ? (city as string) : null,
        minTemp: minTemp ? parseFloat(minTemp as string) : null,
        maxTemp: maxTemp ? parseFloat(maxTemp as string) : null,
        minHumidity: minHumidity ? parseFloat(minHumidity as string) : null,
        maxHumidity: maxHumidity ? parseFloat(maxHumidity as string) : null,
      })

      res.json({
        status: 200,
        message: `Fetched ${incidents.length} incidents`,
        incidents,
      })
    } catch (error) {
      next(new ApiError(400, 'Failure fetching incident reports'))
    }
  }

  static getIncidentsByCountry = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    // TODO: Add error handling for when country name is absent
    const { countryName } = req.params

    try {
      const incidents = await IncidentService.getIncidentByCountry(countryName)
      res.json({
        status: 200,
        message: `Got ${incidents.length} incidents that occurred in ${countryName}`,
        incidents,
      })
    } catch (error) {
      next(
        new ApiError(
          400,
          `Failure fetching incident reports from ${countryName}`,
        ),
      )
    }
  }
}
