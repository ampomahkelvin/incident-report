// import sinon from 'sinon'
// import assert from 'assert'
// import IncidentRepository from '../repositories' // Adjust path as necessary
// import { sqlQuest } from '../../../config/database' // Adjust path if necessary
// import { ApiError } from '../../../shared/utils/api-error' // Adjust path if necessary
//
// describe('IncidentRepository', function () {
//   let sqlQuestStub: sinon.SinonStub
//
//   beforeEach(function () {
//     sqlQuestStub = sinon.stub(sqlQuest, 'one')
//     sinon.stub(sqlQuest, 'manyOrNone')
//   })
//
//   afterEach(function () {
//     sinon.restore()
//   })
//
//   describe('submitIncident', function () {
//     const mockData = {
//       incident_desc: 'Incident reported',
//       city: 'Accra',
//       country: 'Ghana',
//       weather_report: {
//         coord: {
//           lon: -0.1969,
//           lat: 5.556,
//         },
//         weather: [
//           {
//             id: 801,
//             main: 'Clouds',
//             description: 'few clouds',
//             icon: '02d',
//           },
//         ],
//         base: 'stations',
//         main: {
//           temp: 302.36,
//           feels_like: 305.4,
//           temp_min: 302.36,
//           temp_max: 302.36,
//           pressure: 1009,
//           humidity: 65,
//           sea_level: 1009,
//           grnd_level: 1006,
//         },
//         visibility: 10000,
//         wind: {
//           speed: 4.96,
//           deg: 170,
//           gust: 5.69,
//         },
//         clouds: {
//           all: 16,
//         },
//         dt: 1733418413,
//         sys: {
//           country: 'GH',
//           sunrise: 1733378238,
//           sunset: 1733420768,
//         },
//         timezone: 0,
//         id: 2306104,
//         name: 'Accra',
//         cod: 200,
//       },
//       date: new Date(),
//       temperature: 302.36,
//       humidity: 65,
//       client_id: 1,
//     }
//
//     it('should successfully submit an incident', async function () {
//       const expectedResponse = { id: 1, ...mockData }
//       sqlQuestStub.resolves(expectedResponse)
//
//       const response = await IncidentRepository.submitIncident(mockData)
//
//       assert(response.id, "Response should have an 'id'")
//       assert.strictEqual(response.incident_desc, mockData.incident_desc)
//       assert.strictEqual(response.city, mockData.city)
//     })
//
//     it('should throw an error if there is a database issue', async function () {
//       const errorMessage = 'Database error'
//       // Stub the 'one' method for this case
//       sqlQuestStub.rejects(new ApiError(400, errorMessage))
//
//       try {
//         await IncidentRepository.submitIncident(mockData)
//         assert.fail('Expected an error to be thrown')
//       } catch (error) {
//         assert(
//           error instanceof ApiError,
//           'Error should be an instance of ApiError',
//         )
//         assert.strictEqual(
//           error.message,
//           400,
//           'Error should have statusCode 400',
//         )
//         assert.strictEqual(
//           error.message,
//           errorMessage,
//           'Error message should match',
//         )
//       }
//     })
//   })
//
//   describe('getIncidents', function () {
//     it('should successfully retrieve incidents based on filters', async function () {
//       const filterData = {
//         city: 'Accra',
//         minTemp: 20,
//         maxTemp: 30,
//         minHumidity: 60,
//         maxHumidity: 80,
//       }
//       const expectedResponse = [
//         { id: 1, city: 'Accra', temperature: 25, humidity: 70 },
//         { id: 2, city: 'Accra', temperature: 22, humidity: 65 },
//       ]
//
//       // Stub the 'manyOrNone' method to resolve with the expected response
//       sqlQuestStub.resolves(expectedResponse)
//
//       const response = await IncidentRepository.getIncidents(filterData)
//
//       // Assert that the response is an array
//       assert(Array.isArray(response), 'Response should be an array')
//
//       // Assert that the array is not empty
//       assert(response.length > 0, 'Response array should not be empty')
//
//       // Assert that the array contains the expected incident data
//       assert.strictEqual(response[0].city, 'Accra')
//       assert.strictEqual(response[0].temperature, 25)
//       assert.strictEqual(response[0].humidity, 70)
//     })
//
//     it('should throw an error if there is a database issue', async function () {
//       const filterData = {
//         city: 'Accra',
//         minTemp: 20,
//         maxTemp: 30,
//         minHumidity: 60,
//         maxHumidity: 80,
//       }
//       const errorMessage = 'Database error'
//
//       // Stub the 'manyOrNone' method to reject with a database error
//       sqlQuestStub.rejects(new ApiError(400, errorMessage))
//
//       try {
//         await IncidentRepository.getIncidents(filterData)
//         assert.fail('Expected an error to be thrown')
//       } catch (error) {
//         // Check that error is an instance of ApiError
//         assert(
//           error instanceof ApiError,
//           'Error should be an instance of ApiError',
//         )
//
//         // Check that error message and status code are as expected
//         assert.strictEqual(error.message, 400)
//         assert.strictEqual(error.message, errorMessage)
//       }
//     })
//   })
//
//   describe('getIncidentByCountryName', function () {
//     it('should successfully retrieve incidents for a specific country', async function () {
//       const countryName = 'Ghana'
//       const expectedResponse = [
//         { id: 1, city: 'Accra', country: 'Ghana', incident_desc: 'Flood' },
//         {
//           id: 2,
//           city: 'Kumasi',
//           country: 'Ghana',
//           incident_desc: 'Earthquake',
//         },
//       ]
//
//       // Stub the 'manyOrNone' method
//       sqlQuestStub.resolves(expectedResponse)
//
//       const response =
//         await IncidentRepository.getIncidentByCountryName(countryName)
//
//       assert(Array.isArray(response), 'Response should be an array')
//       assert(response.length > 0, 'Response array should not be empty')
//       assert.strictEqual(response[0].country, 'Ghana')
//       assert.strictEqual(response[0].incident_desc, 'Flood')
//     })
//
//     it('should throw an error if there is a database issue', async function () {
//       const countryName = 'Ghana'
//       const errorMessage = 'Database error'
//
//       // Stub the 'manyOrNone' method to reject
//       sqlQuestStub.rejects(new ApiError(400, errorMessage))
//
//       try {
//         await IncidentRepository.getIncidentByCountryName(countryName)
//         assert.fail('Expected an error to be thrown')
//       } catch (error) {
//         assert(
//           error instanceof ApiError,
//           'Error should be an instance of ApiError',
//         )
//         assert.strictEqual(error.message, 400)
//         assert.strictEqual(error.message, errorMessage)
//       }
//     })
//   })
// })
