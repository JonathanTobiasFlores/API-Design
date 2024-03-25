import express from 'express'
import { router as hiveRouter } from './hive-router.js'
import { router as authRouter } from './auth-router.js'
import swaggerUi from 'swagger-ui-express'
import { specs } from '../../../utils/swagger-config.js'

export const router = express.Router()

router.use('/', hiveRouter)
router.use('/auth', authRouter)
router.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }))
