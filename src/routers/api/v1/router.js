import express from 'express'
import { router as resourceRouter } from './resource-router.js'
import swaggerUi from 'swagger-ui-express'
import { specs } from '../../../utils/swagger-config.js'

export const router = express.Router()

router.use('/', resourceRouter)
router.use('/docs', swaggerUi.serve, swaggerUi.setup(specs))
