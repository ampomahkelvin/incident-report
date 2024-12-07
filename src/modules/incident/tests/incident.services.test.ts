import assert from 'assert'
import sinon from 'sinon'
import axios from 'axios'
import { IncidentService } from '../services'
import IncidentRepository from '../repositories'
import { ApiError } from '../../../shared/utils/api-error'

describe('IncidentService', () => {
  let axiosGetStub: sinon.SinonStub
  let repositoryStub: sinon.SinonStub

  afterEach(() => {
    sinon.restore()
  })

  describe('getWeatherData', () => {
    it('should successfully fetch weather data for a city', async () => {
      const mockResponse = {
        data: {
          weather: [{ main: 'Clear', description: 'clear sky' }],
          main: { temp: 300 },
        },
      }

      axiosGetStub = sinon.stub(axios, 'get').resolves(mockResponse)

      const response = await IncidentService.getWeatherData('Accra')

      assert.deepEqual(response, mockResponse.data)
      assert(axiosGetStub.calledOnce, 'axios.get should be called once')
      assert(
        axiosGetStub.calledWithMatch(/Accra/),
        'axios.get should query the correct city',
      )
    })

    it('should throw an ApiError when fetching weather data fails', async () => {
      axiosGetStub = sinon.stub(axios, 'get').rejects(new Error('API failure'))

      try {
        await IncidentService.getWeatherData('Accra')
        assert.fail('Expected an error to be thrown')
      } catch (error) {
        assert(
          error instanceof ApiError,
          'Error should be an instance of ApiError',
        )
        assert.strictEqual(
          error.message,
          'Failed to fetch data from Openweather API',
        )
        assert.strictEqual(error.statusCode, 500)
      }
    })
  })

  describe('submitIncident', () => {
    const incidentData = {
      incident_desc: 'Incident reported',
      city: 'Accra',
      country: 'Ghana',
      weather_report: {
        coord: {
          lon: -0.1969,
          lat: 5.556,
        },
        weather: [
          {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02d',
          },
        ],
        base: 'stations',
        main: {
          temp: 302.36,
          feels_like: 305.4,
          temp_min: 302.36,
          temp_max: 302.36,
          pressure: 1009,
          humidity: 65,
          sea_level: 1009,
          grnd_level: 1006,
        },
        visibility: 10000,
        wind: {
          speed: 4.96,
          deg: 170,
          gust: 5.69,
        },
        clouds: {
          all: 16,
        },
        dt: 1733418413,
        sys: {
          country: 'GH',
          sunrise: 1733378238,
          sunset: 1733420768,
        },
        timezone: 0,
        id: 2306104,
        name: 'Accra',
        cod: 200,
      },
      date: new Date(),
      temperature: 302.36,
      humidity: 65,
      client_id: 1,
    }
    it('should successfully submit an incident', async () => {
      repositoryStub = sinon
        .stub(IncidentRepository, 'submitIncident')
        .resolves(incidentData)

      const response = await IncidentService.submitIncident(incidentData)

      assert.deepEqual(
        response,
        incidentData,
        'Response should match the submitted data',
      )
      assert(
        repositoryStub.calledOnce,
        'IncidentRepository.submitIncident should be called once',
      )
    })

    it('should throw an ApiError if repository submission fails', async () => {
      repositoryStub = sinon
        .stub(IncidentRepository, 'submitIncident')
        .rejects(new ApiError(404, 'Database error'))

      try {
        await IncidentService.submitIncident(incidentData)
        assert.fail('Expected an error to be thrown')
      } catch (error) {
        assert(
          error instanceof ApiError,
          'Error should be an instance of ApiError',
        )
        assert.strictEqual(error.message, 'Database error')
        assert.strictEqual(
          error.statusCode,
          400,
          'Error should have statusCode 400',
        )
      }
    })
  })

  describe('getIncidents', () => {
    it('should retrieve incidents based on filters', async () => {
      const filterData = {
        city: 'Accra',
        minTemp: 20,
        maxTemp: 30,
        minHumidity: 60,
        maxHumidity: 80,
      }

      const mockResponse = [
        { id: 1, city: 'Accra', temperature: 25, humidity: 70 },
        { id: 2, city: 'Accra', temperature: 22, humidity: 65 },
      ]

      repositoryStub = sinon
        .stub(IncidentRepository, 'getIncidents')
        .resolves(mockResponse)

      const response = await IncidentService.getIncidents(filterData)

      assert.deepEqual(
        response,
        mockResponse,
        'Response should match the mock data',
      )
      assert(
        repositoryStub.calledOnce,
        'IncidentRepository.getIncidents should be called once',
      )
      assert(
        repositoryStub.calledWith(filterData),
        'Repository should be called with the correct filters',
      )
    })

    it('should throw an ApiError if repository query fails', async () => {
      const filterData = {
        city: 'Accra',
        minTemp: 20,
        maxTemp: 30,
        minHumidity: 60,
        maxHumidity: 80,
      }
      repositoryStub = sinon
        .stub(IncidentRepository, 'getIncidents')
        .rejects(new Error('Database error'))

      try {
        await IncidentService.getIncidents(filterData)
        assert.fail('Expected an error to be thrown')
      } catch (error) {
        assert(
          error instanceof ApiError,
          'Error should be an instance of ApiError',
        )
        assert.strictEqual(error.message, 'Database error')
        assert.strictEqual(error.statusCode, 400)
      }
    })
  })

  describe('getIncidentByCountry', () => {
    it('should retrieve incidents for a specific country', async () => {
      const countryName = 'Ghana'

      const mockResponse = [
        {
          id: 1,
          country: 'Ghana',
          city: 'Accra',
          temperature: 25,
          humidity: 70,
        },
      ]

      repositoryStub = sinon
        .stub(IncidentRepository, 'getIncidentByCountryName')
        .resolves(mockResponse)

      const response = await IncidentService.getIncidentByCountry(countryName)

      assert.deepEqual(
        response,
        mockResponse,
        'Response should match the mock data',
      )
      assert(
        repositoryStub.calledOnce,
        'IncidentRepository.getIncidentByCountryName should be called once',
      )
      assert(
        repositoryStub.calledWith(countryName),
        'Repository should be called with the correct country name',
      )
    })

    it('should throw an ApiError if repository query fails', async () => {
      const countryName = 'Ghana'

      repositoryStub = sinon
        .stub(IncidentRepository, 'getIncidentByCountryName')
        .rejects(new Error('Database error'))

      try {
        await IncidentService.getIncidentByCountry(countryName)
        assert.fail('Expected an error to be thrown')
      } catch (error) {
        assert(
          error instanceof ApiError,
          'Error should be an instance of ApiError',
        )
        assert.strictEqual(error.message, 'Database error')
        assert.strictEqual(error.statusCode, 400)
      }
    })
  })
})
