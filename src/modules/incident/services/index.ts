import { SubmitIncidentSchema } from '../validations'
import IncidentRepository from '../repositories'
import axios from 'axios'
import Env from '../../../shared/utils/env'
import { ApiError } from '../../../shared/utils/api-error'

export class IncidentService {
  // Gets weather data
  static getWeatherData = async (city: string) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Env.get('OPEN_WEATHER_API_KEY')}`,
      )
      return response.data
    } catch (error) {
      throw new ApiError(500, 'Failed to fetch data from Openweather API')
    }
  }

  static submitIncident = async (data: SubmitIncidentSchema) => {
    try {
      return await IncidentRepository.submitIncident(data)
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
      return await IncidentRepository.getIncidents({
        city: city ?? null,
        minTemp: minTemp ?? null,
        maxTemp: maxTemp ?? null,
        minHumidity: minHumidity ?? null,
        maxHumidity: maxHumidity ?? null,
      })
    } catch (error) {
      throw new ApiError(400, error.message)
    }
  }

  static getIncidentByCountry = async (countryName: string) => {
    try {
      return await IncidentRepository.getIncidentByCountryName(countryName)
    } catch (error) {
      throw new ApiError(400, error.message)
    }
  }
}
