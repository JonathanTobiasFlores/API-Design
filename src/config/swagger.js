import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Beehive API',
      version: '1.0.0',
      description: 'A simple API about beehives',
      contact: {
        name: 'Jonathan Flores',
        email: 'jf223mu@student.lnu.se'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1'
      }
    ]
  },
  apis: ['./api/v1/routes/*.js']
}

export const specs = swaggerJsdoc(options)
