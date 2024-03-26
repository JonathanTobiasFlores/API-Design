/* eslint-disable jsdoc/require-returns */
import { Webhook } from '../../models/webhook-model.js'

/**
 *
 */
export class WebhookController {
  /**
   * List all webhooks.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware function.
   */
  async listWebhooks (req, res, next) {
    try {
      const webhooks = await Webhook.find()
      res.json(webhooks)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Create a new webhook subscription.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware function.
   */
  async createWebhook (req, res, next) {
    try {
      const webhook = new Webhook(req.body)
      const newWebhook = await webhook.save()
      res.status(201).json(newWebhook)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Delete a webhook subscription.
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
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}
