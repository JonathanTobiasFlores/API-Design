import express from 'express'
import { HiveController } from '../../../controllers/api/hive-controller.js'
import { authenticateJWT } from '../../../utils/authenticate-token.js'

export const router = express.Router()

const controller = new HiveController()

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Beehive Monitoring API',
    links: [
      { rel: 'self', method: 'GET', href: '/api/v1/' },
      { rel: 'hives-status', method: 'GET', href: '/api/v1/hive-status/{hiveId}', title: 'Get the status of a specific hive' },
      { rel: 'hives-humidity', method: 'GET', href: '/api/v1/hive-humidity?hiveId={hiveId}', title: 'Get humidity data for a specific hive' },
      { rel: 'hives-weight', method: 'GET', href: '/api/v1/hive-weight?hiveId={hiveId}', title: 'Get weight data for a specific hive' },
      { rel: 'hives-temperature', method: 'GET', href: '/api/v1/hive-temperature?hiveId={hiveId}', title: 'Get temperature data for a specific hive' },
      { rel: 'hives-flow', method: 'GET', href: '/api/v1/hive-flow?hiveId={hiveId}', title: 'Get arrival and departure flow data for a specific hive' },
      { rel: 'create-hive', method: 'POST', href: '/api/v1/create-hive', title: 'Create a new hive (Authenticated users only)' },
      { rel: 'delete-hive', method: 'DELETE', href: '/api/v1/delete-hive/{hiveId}', title: 'Delete a specific hive (Authenticated users only)' },
      { rel: 'update-hive', method: 'PUT', href: '/api/v1/update-hive/{hiveId}', title: 'Update a specific hive (Authenticated users only)' }
    ]
  })
})

router.get('/hive-status/:hiveId', (req, res, next) => controller.getHiveStatus(req, res, next))

router.get('/hive-humidity', (req, res, next) => controller.getHiveHumidity(req, res, next))

router.get('/hive-weight', (req, res, next) => controller.getHiveWeight(req, res, next))

router.get('/hive-temperature', (req, res, next) => controller.getHiveTemperature(req, res, next))

router.get('/hive-flow', (req, res, next) => controller.getHiveFlow(req, res, next))

router.post('/create-hive', authenticateJWT, (req, res, next) => controller.createHive(req, res, next))

router.delete('/delete-hive/:hiveId', authenticateJWT, (req, res, next) => controller.deleteHive(req, res, next))

router.put('/update-hive/:hiveId', authenticateJWT, (req, res, next) => controller.updateHive(req, res, next))
