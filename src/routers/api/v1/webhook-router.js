import express from 'express'
import { WebhookController } from '../../../controllers/api/webhook-controller.js'

export const router = express.Router()

const webhookController = new WebhookController()

router.get('/', webhookController.listWebhooks)

router.post('/', webhookController.createWebhook)

router.delete('/:id', webhookController.deleteWebhook)
