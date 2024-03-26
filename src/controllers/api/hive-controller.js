import { HiveModel } from '../../models/hive-model.js'
import { Webhook } from '../../models/webhook-model.js'
/**
 *
 */
export class HiveController {
  /**
   * GET Hive-Status.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware function.
   */
  async getHiveStatus (req, res, next) {
    try {
      const { hiveId } = req.params
      const hive = await HiveModel.findOne({ hiveId }, '-beeFlow')
      res.json(hive)
    } catch (error) {
      next(error)
    }
  }

  /**
   * GET Hive-Humidity.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware function.
   */
  async getHiveHumidity (req, res, next) {
    try {
      const { hiveId } = req.query
      const hive = await HiveModel.findOne({ hiveId }, 'measurements.humidity measurements.timestamp')
      const humidityData = hive.measurements.map(measurement => ({
        timestamp: measurement.timestamp,
        humidity: measurement.humidity
      }))
      res.json(humidityData)
    } catch (error) {
      next(error)
    }
  }

  /**
   * GET Hive-Weight.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware function.
   */
  async getHiveWeight (req, res, next) {
    try {
      const { hiveId } = req.query
      const hive = await HiveModel.findOne({ hiveId }, 'measurements.weight measurements.timestamp')
      const weightData = hive.measurements.map(measurement => ({
        timestamp: measurement.timestamp,
        weight: measurement.weight
      }))
      res.json(weightData)
    } catch (error) {
      next(error)
    }
  }

  /**
   * GET Hive-Temperature.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware function.
   */
  async getHiveTemperature (req, res, next) {
    try {
      const { hiveId } = req.query
      const hive = await HiveModel.findOne({ hiveId }, 'measurements.temperature measurements.timestamp')
      const temperatureData = hive.measurements.map(measurement => ({
        timestamp: measurement.timestamp,
        temperature: measurement.temperature
      }))
      res.json(temperatureData)
    } catch (error) {
      next(error)
    }
  }

  /**
   * GET Hive Flow.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware function.
   */
  async getHiveFlow (req, res, next) {
    try {
      const { hiveId } = req.query
      const hive = await HiveModel.findOne({ hiveId }, 'beeFlow')
      res.json(hive.beeFlow)
    } catch (error) {
      next(error)
    }
  }

  /**
   * CREATE a new Hive and notify webhooks using Fetch API.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware function.
   */
  async createHive (req, res, next) {
    try {
      const newHive = new HiveModel(req.body)
      await newHive.save()

      // Notify all webhooks interested in 'newHiveCreated' event
      const webhooks = await Webhook.find({ event: 'newHiveCreated' })
      webhooks.forEach(async (webhook) => {
        try {
          const response = await fetch(webhook.url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              event: 'newHiveCreated',
              data: {
                hiveId: newHive.hiveId,
                location: newHive.location
              }
            })
          })

          if (!response.ok) {
            throw new Error(`Webhook notification failed with status: ${response.status}`)
          }
        } catch (error) {
          console.error(`Failed to notify webhook ${webhook.url}:`, error)
        }
      })

      res.status(201).json(newHive)
    } catch (error) {
      next(error)
    }
  }

  /**
   * DELETE a Hive.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware function.
   */
  async deleteHive (req, res, next) {
    try {
      const { hiveId } = req.params
      const deleteHive = await HiveModel.findOneAndDelete({ hiveId })
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }

  /**
   * UPDATE a Hive.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware function.
   */
  async updateHive (req, res, next) {
    try {
      const { hiveId } = req.params
      const updateData = {}

      // Check for location and name in the request body and prepare update data
      if (req.body.location) updateData.location = req.body.location
      if (req.body.name) updateData.name = req.body.name

      // If neither location nor name were provided, return an error
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: 'No valid fields provided for update. Only location and name can be updated.' })
      }

      const updatedHive = await HiveModel.findOneAndUpdate({ hiveId }, updateData, { new: true })

      if (!updatedHive) {
        return res.status(404).json({ message: 'Beehive not found' })
      }

      res.json(updatedHive)
    } catch (error) {
      next(error)
    }
  }
}
