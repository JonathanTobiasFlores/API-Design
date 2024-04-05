/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */
import express from 'express'
import { WebhookController } from '../../../controllers/api/webhook-controller.js'

export const router = express.Router()

const webhookController = new WebhookController()

/**
 * @swagger
 * tags:
 *   name: Webhooks
 *   description: API endpoints for managing webhooks
 */

/**
 * @swagger
 * /api/v1/webhooks:
 *   get:
 *     summary: Get webhooks endpoint
 *     description: Retrieve information about webhook endpoints.
 *     tags: [Webhooks]
 *     responses:
 *       200:
 *         description: Information about webhook endpoints.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Webhooks endpoint
 *                 links:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       rel:
 *                         type: string
 *                         example: webhooks
 *                       method:
 *                         type: string
 *                         example: GET
 *                       href:
 *                         type: string
 *                         example: /api/v1/webhooks
 *                       title:
 *                         type: string
 *                         example: List all webhooks
 */
router.get('/', webhookController.listWebhooks, (req, res) => {
  res.json({
    message: 'Webhooks endpoint',
    links: [
      { rel: 'webhooks', method: 'GET', href: '/api/v1/webhooks', title: 'List all webhooks' },
      { rel: 'webhooks', method: 'POST', href: '/api/v1/webhooks', title: 'Create a new webhook' },
      { rel: 'webhooks', method: 'DELETE', href: '/api/v1/webhooks/{id}', title: 'Delete a specific webhook' }
    ]
  })
})

/**
 * @swagger
 * /api/v1/webhooks:
 *   post:
 *     summary: Create a new webhook
 *     description: Create a new webhook.
 *     tags: [Webhooks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 example: https://example.com/webhook
 *     responses:
 *       201:
 *         description: Webhook created successfully.
 *       500:
 *         description: Internal server error
 */
router.post('/', webhookController.createWebhook)

/**
 * @swagger
 * /api/v1/webhooks/{id}:
 *   delete:
 *     summary: Delete a specific webhook
 *     description: Delete a specific webhook by ID.
 *     tags: [Webhooks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the webhook to delete
 *     responses:
 *       204:
 *         description: Webhook deleted successfully.
 *       404:
 *         description: Webhook not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', webhookController.deleteWebhook)
