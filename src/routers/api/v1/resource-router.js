import express from 'express'
import { ResourceController } from '../../../controllers/api/resource-controller.js'

export const router = express.Router()

const controller = new ResourceController()

router.post('/test1', (req, res, next) => controller.POST(req, res, next))

router.get('/test2', (req, res, next) => controller.GET(req, res, next))

router.put('/test3', (req, res, next) => controller.PUT(req, res, next))

router.patch('/test4', (req, res, next) => controller.PATCH(req, res, next))

router.delete('/test5', (req, res, next) => controller.DELETE(req, res, next))
