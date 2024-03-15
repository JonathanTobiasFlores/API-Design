import express from 'express'
import { HiveController } from '../../../controllers/api/hive-controller.js'

export const router = express.Router()

const controller = new HiveController()

router.get('/hive-status', (req, res, next) => controller.getHiveStatus(req, res, next))

router.get('/hive-humidity', (req, res, next) => controller.getHiveHumidity(req, res, next))

router.get('/hive-weight', (req, res, next) => controller.getHiveWeight(req, res, next))

router.get('/hive-temperature', (req, res, next) => controller.getHiveTemperature(req, res, next))

router.get('/hive-flow', (req, res, next) => controller.getHiveFlow(req, res, next))
