/* eslint-disable jsdoc/require-returns */
import { Webhook } from '../../models/webhook-model.js'

/**
 * WebhookController class to manage webhook subscriptions.
 */
export class WebhookController {
  /**
   * Lists all webhooks.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware function.
   */
  async listWebhooks (req, res, next) {
    try {
      const webhooks = await Webhook.find()
      const response = {
        webhooks,
        links: [
          { rel: 'self', method: 'GET', href: '/api/v1/webhooks', title: 'List all webhooks' },
          { rel: 'create', method: 'POST', href: '/api/v1/webhooks', title: 'Create a new webhook' }
        ]
      }
      res.json(response)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Creates a new webhook subscription.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware function.
   */
  async createWebhook (req, res, next) {
    try {
      const webhook = new Webhook(req.body)
      const newWebhook = await webhook.save()
      const response = {
        ...newWebhook.toObject(),
        links: [
          { rel: 'self', method: 'GET', href: `/api/v1/webhooks/${newWebhook._id}`, title: 'This webhook' },
          { rel: 'delete', method: 'DELETE', href: `/api/v1/webhooks/${newWebhook._id}`, title: 'Delete this webhook' }
        ]
      }
      res.status(201).json(response)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Deletes a webhook subscription.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware function.
   */
  async deleteWebhook (req, res, next) {
    try {
      const { id } = req.params
      const webhook = await Webhook.findByIdAndDelete(id)
      if (!webhook) {
        return res.status(404).json({ message: 'Webhook not found' })
      }
      const response = {
        message: 'Webhook deleted successfully',
        links: [
          { rel: 'create', method: 'POST', href: '/api/v1/webhooks', title: 'Create a new webhook' },
          { rel: 'list', method: 'GET', href: '/api/v1/webhooks', title: 'List all webhooks' }
        ]
      }
      res.status(204).json(response)
    } catch (error) {
      next(error)
    }
  }
}
