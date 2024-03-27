import express from 'express'
import { WebhookController } from '../../../controllers/api/webhook-controller.js'

export const router = express.Router()

const webhookController = new WebhookController()

router.get('/', (req, res) => {
  res.json({
    message: 'Webhooks endpoint',
    links: [
      { rel: 'webhooks', method: 'GET', href: '/api/v1/webhooks', title: 'List all webhooks' },
      { rel: 'webhooks', method: 'POST', href: '/api/v1/webhooks', title: 'Create a new webhook' },
      { rel: 'webhooks', method: 'DELETE', href: '/api/v1/webhooks/{id}', title: 'Delete a specific webhook' }
    ]
  })
})

router.get('/', webhookController.listWebhooks)

router.post('/', webhookController.createWebhook)

router.delete('/:id', webhookController.deleteWebhook)
