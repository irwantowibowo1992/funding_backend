require('dotenv').config()

const swaggerDefinition = {
  info: {
    title: 'Rest API Project',
    version: '1.0.0',
    description: 'Documentation of My Project'
  },
  host: process.env.SWAGGER_URL,
  // basePath: '/api/v1',
  // schemes: ['http', 'https'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header'
    }
  }
}

module.exports = swaggerDefinition
