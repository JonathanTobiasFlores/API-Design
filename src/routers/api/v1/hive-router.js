import express from 'express'
import { HiveController } from '../../../controllers/api/hive-controller.js'
import { authenticateJWT } from '../../../utils/authenticate-token.js'

export const router = express.Router()

const controller = new HiveController()

router.get('/hive-status/:hiveId', (req, res, next) => controller.getHiveStatus(req, res, next))

router.get('/hive-humidity', (req, res, next) => controller.getHiveHumidity(req, res, next))

router.get('/hive-weight', (req, res, next) => controller.getHiveWeight(req, res, next))

router.get('/hive-temperature', (req, res, next) => controller.getHiveTemperature(req, res, next))

router.get('/hive-flow', (req, res, next) => controller.getHiveFlow(req, res, next))

router.post('/create-hive', authenticateJWT, (req, res, next) => controller.createHive(req, res, next))

router.delete('/delete-hive/:hiveId', authenticateJWT, (req, res, next) => controller.deleteHive(req, res, next))

router.put('/update-hive/:hiveId', authenticateJWT, (req, res, next) => controller.updateHive(req, res, next))
