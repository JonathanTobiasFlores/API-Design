import { Webhook } from '../../models/webhook-model.js'

/**
 *
 */
export class WebhookController {
  // List all webhooks
  /**
   *
   * @param req
   * @param res
   */
  async listWebhooks (req, res) {
    try {
      const webhooks = await Webhook.find()
      res.json(webhooks)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  // Create a new webhook subscription
  /**
   *
   * @param req
   * @param res
   */
  async createWebhook (req, res) {
    try {
      const webhook = new Webhook(req.body)
      const newWebhook = await webhook.save()
      res.status(201).json(newWebhook)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  // Delete a webhook subscription
  /**
   *
   * @param req
   * @param res
   */
  async deleteWebhook (req, res) {
    try {
      const { id } = req.params
      const webhook = await Webhook.findByIdAndDelete(id)
      if (!webhook) {
        return res.status(404).json({ message: 'Webhook not found' })
      }
      res.status(204).send()
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
