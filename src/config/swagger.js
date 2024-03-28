import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Beehive Monitoring API',
      version: '1.0.0',
      description: 'This API provides endpoints for managing beehives, including retrieving statuses, humidity, weight, temperature, and bee flow data. It also supports user authentication and webhook management.'
    },
    servers: [
      {
        url: 'https://cscloud6-247.lnu.se/api-design/',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/routers/api/v1/*.js']
}

export const specs = swaggerJsdoc(options)
