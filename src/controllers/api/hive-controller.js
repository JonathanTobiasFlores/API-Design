/* eslint-disable jsdoc/require-returns */
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
      const hive = await HiveModel.findOne({ hiveId })
      if (!hive) {
        return res.status(404).json({ message: 'Hive not found' })
      }

      const response = {
        hive,
        links: [
          {
            rel: 'self',
            method: 'GET',
            href: `/api/v1/hive-status/${hiveId}`,
            title: "This hive's status"
          },
          {
            rel: 'update',
            method: 'PUT',
            href: `/api/v1/update-hive/${hiveId}`,
            title: 'Update this hive'
          },
          {
            rel: 'delete',
            method: 'DELETE',
            href: `/api/v1/delete-hive/${hiveId}`,
            title: 'Delete this hive'
          },
          {
            rel: 'humidity-data',
            method: 'GET',
            href: `/api/v1/hive-humidity?hiveId=${hiveId}`,
            title: 'View humidity data for this hive'
          },
          {
            rel: 'weight-data',
            method: 'GET',
            href: `/api/v1/hive-weight?hiveId=${hiveId}`,
            title: 'View weight data for this hive'
          },
          {
            rel: 'temperature-data',
            method: 'GET',
            href: `/api/v1/hive-temperature?hiveId=${hiveId}`,
            title: 'View temperature data for this hive'
          },
          {
            rel: 'bee-flow-data',
            method: 'GET',
            href: `/api/v1/hive-flow?hiveId=${hiveId}`,
            title: 'View bee flow data for this hive'
          }
        ]
      }

      res.json(response)
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
      if (!hive) {
        return res.status(404).json({ message: 'Hive not found' })
      }
      const humidityData = hive.measurements.map(measurement => ({
        timestamp: measurement.timestamp,
        humidity: measurement.humidity
      }))

      const response = {
        humidityData,
        links: [
          {
            rel: 'self',
            method: 'GET',
            href: `/api/v1/hive-humidity?hiveId=${hiveId}`,
            title: "This hive's humidity data"
          },
          {
            rel: 'hive-status',
            method: 'GET',
            href: `/api/v1/hive-status/${hiveId}`,
            title: "View this hive's status"
          },
          {
            rel: 'weight-data',
            method: 'GET',
            href: `/api/v1/hive-weight?hiveId=${hiveId}`,
            title: 'View weight data for this hive'
          },
          {
            rel: 'temperature-data',
            method: 'GET',
            href: `/api/v1/hive-temperature?hiveId=${hiveId}`,
            title: 'View temperature data for this hive'
          },
          {
            rel: 'bee-flow-data',
            method: 'GET',
            href: `/api/v1/hive-flow?hiveId=${hiveId}`,
            title: 'View bee flow data for this hive'
          }
        ]
      }

      res.json(response)
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
      if (!hive) {
        return res.status(404).json({ message: 'Hive not found' })
      }
      const weightData = hive.measurements.map(measurement => ({
        timestamp: measurement.timestamp,
        weight: measurement.weight
      }))

      const response = {
        weightData,
        links: [
          {
            rel: 'self',
            method: 'GET',
            href: `/api/v1/hive-weight?hiveId=${hiveId}`,
            title: "This hive's weight data"
          },
          {
            rel: 'hive-status',
            method: 'GET',
            href: `/api/v1/hive-status/${hiveId}`,
            title: "View this hive's status"
          },
          {
            rel: 'humidity-data',
            method: 'GET',
            href: `/api/v1/hive-humidity?hiveId=${hiveId}`,
            title: 'View humidity data for this hive'
          },
          {
            rel: 'temperature-data',
            method: 'GET',
            href: `/api/v1/hive-temperature?hiveId=${hiveId}`,
            title: 'View temperature data for this hive'
          },
          {
            rel: 'bee-flow-data',
            method: 'GET',
            href: `/api/v1/hive-flow?hiveId=${hiveId}`,
            title: 'View bee flow data for this hive'
          }
        ]
      }

      res.json(response)
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
      if (!hive) {
        return res.status(404).json({ message: 'Hive not found' })
      }
      const temperatureData = hive.measurements.map(measurement => ({
        timestamp: measurement.timestamp,
        temperature: measurement.temperature
      }))

      const response = {
        temperatureData,
        links: [
          {
            rel: 'self',
            method: 'GET',
            href: `/api/v1/hive-temperature?hiveId=${hiveId}`,
            title: "This hive's temperature data"
          },
          {
            rel: 'hive-status',
            method: 'GET',
            href: `/api/v1/hive-status/${hiveId}`,
            title: "View this hive's status"
          },
          {
            rel: 'humidity-data',
            method: 'GET',
            href: `/api/v1/hive-humidity?hiveId=${hiveId}`,
            title: 'View humidity data for this hive'
          },
          {
            rel: 'weight-data',
            method: 'GET',
            href: `/api/v1/hive-weight?hiveId=${hiveId}`,
            title: 'View weight data for this hive'
          },
          {
            rel: 'bee-flow-data',
            method: 'GET',
            href: `/api/v1/hive-flow?hiveId=${hiveId}`,
            title: 'View bee flow data for this hive'
          }
        ]
      }

      res.json(response)
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
      if (!hive) {
        return res.status(404).json({ message: 'Hive not found' })
      }

      const response = {
        beeFlow: hive.beeFlow,
        links: [
          {
            rel: 'self',
            method: 'GET',
            href: `/api/v1/hive-flow?hiveId=${hiveId}`,
            title: "This hive's bee flow data"
          },
          {
            rel: 'hive-status',
            method: 'GET',
            href: `/api/v1/hive-status/${hiveId}`,
            title: "View this hive's status"
          },
          {
            rel: 'humidity-data',
            method: 'GET',
            href: `/api/v1/hive-humidity?hiveId=${hiveId}`,
            title: 'View humidity data for this hive'
          },
          {
            rel: 'weight-data',
            method: 'GET',
            href: `/api/v1/hive-weight?hiveId=${hiveId}`,
            title: 'View weight data for this hive'
          },
          {
            rel: 'temperature-data',
            method: 'GET',
            href: `/api/v1/hive-temperature?hiveId=${hiveId}`,
            title: 'View temperature data for this hive'
          }
        ]
      }

      res.json(response)
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

      // Extract hiveId from newHive
      const hiveId = newHive.hiveId

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
                hiveId,
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

      const links = [
        {
          rel: 'self',
          method: 'GET',
          href: `/api/v1/hive-status/${hiveId}`,
          title: "This hive's status"
        },
        {
          rel: 'update',
          method: 'PUT',
          href: `/api/v1/update-hive/${hiveId}`,
          title: 'Update this hive'
        },
        {
          rel: 'delete',
          method: 'DELETE',
          href: `/api/v1/delete-hive/${hiveId}`,
          title: 'Delete this hive'
        },
        {
          rel: 'humidity-data',
          method: 'GET',
          href: `/api/v1/hive-humidity?hiveId=${hiveId}`,
          title: 'View humidity data for this hive'
        },
        {
          rel: 'weight-data',
          method: 'GET',
          href: `/api/v1/hive-weight?hiveId=${hiveId}`,
          title: 'View weight data for this hive'
        },
        {
          rel: 'temperature-data',
          method: 'GET',
          href: `/api/v1/hive-temperature?hiveId=${hiveId}`,
          title: 'View temperature data for this hive'
        },
        {
          rel: 'bee-flow-data',
          method: 'GET',
          href: `/api/v1/hive-flow?hiveId=${hiveId}`,
          title: 'View bee flow data for this hive'
        }
      ]

      res.status(201).json({ newHive, links })
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
      const deletedHive = await HiveModel.findOneAndDelete({ hiveId })
      if (!deletedHive) {
        return res.status(404).json({ message: 'Hive not found' })
      }
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

      const response = {
        updatedHive,
        links: [
          {
            rel: 'self',
            method: 'GET',
            href: `/api/v1/hive-status/${hiveId}`,
            title: "View this hive's updated status"
          },
          {
            rel: 'humidity-data',
            method: 'GET',
            href: `/api/v1/hive-humidity?hiveId=${hiveId}`,
            title: 'View humidity data for this hive'
          },
          {
            rel: 'weight-data',
            method: 'GET',
            href: `/api/v1/hive-weight?hiveId=${hiveId}`,
            title: 'View weight data for this hive'
          },
          {
            rel: 'temperature-data',
            method: 'GET',
            href: `/api/v1/hive-temperature?hiveId=${hiveId}`,
            title: 'View temperature data for this hive'
          },
          {
            rel: 'bee-flow-data',
            method: 'GET',
            href: `/api/v1/hive-flow?hiveId=${hiveId}`,
            title: 'View bee flow data for this hive'
          }
        ]
      }

      res.json(response)
    } catch (error) {
      next(error)
    }
  }
}
