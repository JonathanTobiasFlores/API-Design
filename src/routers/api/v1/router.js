import express from 'express'
import { router as hiveRouter } from './hive-router.js'
import swaggerUi from 'swagger-ui-express'
import { specs } from '../../../utils/swagger-config.js'

export const router = express.Router()

router.use('/', hiveRouter)
router.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }))
