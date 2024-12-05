# 🚨 Incident Reporting API

## 🌟 Project Overview

The **Incident Reporting API** is a robust backend solution designed for insurance client incident management. This project provides a comprehensive system to:

- **Create detailed incident reports**
- **Integrate real-time weather data**
- **Retrieve and filter incident information**

## 📋 Project Specifications

### 🔧 Technology Stack
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Testing**: 
  * Mocha
  * Chai
- **External API**: OpenWeatherMap

### 🎯 Key Features
- Incident report creation with automatic weather data enrichment
- Advanced incident filtering
- Country-based incident search
- Comprehensive test coverage

## 🚀 Getting Started

### Prerequisites
- ✅ Node.js (v18+)
- ✅ PostgreSQL
- ✅ OpenWeatherMap API Key

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd incident-reporting-api
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file with the following configurations:
   ```plaintext
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=incident_reporting
   DB_USER=your_username
   DB_PASSWORD=your_password

   # OpenWeatherMap API
   OPENWEATHER_API_KEY=your_api_key

   # Server Configuration
   PORT=3000
   ```

## 🔍 API Endpoints

### 1. Create Incident Report
**Endpoint**: `POST /api/incidents`

**Request Payload**:
```json
{
  "client_id": 123,
  "incident_desc": "Vehicle collision",
  "city": "Accra",
  "country": "Ghana"
}
```

**Response Example**:
```json
{
  "client_id": 123,
  "incident_desc": "Vehicle collision",
  "city": "Accra",
  "country": "Ghana", 
  "date": "2024-12-04T10:30:00Z",
  "weather_report": {
    "temperature": 28.5,
    "humidity": 75,
    "description": "Partly cloudy"
  }
}
```

### 2. List Incidents
**Endpoint**: `GET /api/incidents`

**Query Parameters**:
- `city`: Filter by city
- `minTemp`: Minimum temperature
- `maxTemp`: Maximum temperature
- `minHumidity`: Minimum humidity
- `maxHumidity`: Maximum humidity

**Example Request**:
```
GET /api/incidents?city=Accra&minTemp=25&maxTemp=30&minHumidity=70&maxHumidity=80
```

### 3. Search Incidents by Country
**Endpoint**: `POST /api/incidents/search`

**Request Payload**:
```json
{
  "country": "Ghana"
}
```

## 🧪 Testing

### Run Tests
```bash
# All tests
npm test

# Unit tests
npm run test:unit

# Integration tests
npm run test:integration
```

## 🛠 Error Handling

**HTTP Status Codes**:
- `200`: Successful request
- `400`: Bad request
- `404`: Resource not found
- `500`: Server error

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/amazing-improvement
   ```
3. Commit changes
   ```bash
   git commit -m 'Add some amazing improvement'
   ```
4. Push to branch
   ```bash
   git push origin feature/amazing-improvement
   ```
5. Open a Pull Request

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more details.
