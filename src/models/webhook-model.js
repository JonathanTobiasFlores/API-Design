import mongoose from 'mongoose'

const webhookSchema = new mongoose.Schema({
  url: { type: String, required: true },
  event: { type: String, required: true },
  secret: { type: String }
})

export const Webhook = mongoose.model('Webhook', webhookSchema)
