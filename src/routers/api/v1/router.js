import express from 'express'
import { router as hiveRouter } from './hive-router.js'
import { router as authRouter } from './auth-router.js'
import { router as webhookRouter } from './webhook-router.js'
import swaggerUi from 'swagger-ui-express'
import { specs } from '../../../config/swagger.js'

export const router = express.Router()

router.use('/', hiveRouter)
router.use('/auth', authRouter)
router.use('/webhooks', webhookRouter)
router.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }))
