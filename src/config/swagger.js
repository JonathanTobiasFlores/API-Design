import swaggerJsdoc from 'swagger-jsdoc'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Convert the import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Beehive Monitoring API',
      version: '1.0.0',
      description: 'This API provides endpoints for managing beehives, including retrieving statuses, humidity, weight, temperature, and bee flow data. It also supports user authentication and webhook management.'
    },
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
  apis: [join(__dirname, '../routers/api/v1/*.js')]
}

export const specs = swaggerJsdoc(options)
