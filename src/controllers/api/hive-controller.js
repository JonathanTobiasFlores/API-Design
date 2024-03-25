import { HiveModel } from '../../models/hive-model.js'
/**
 *
 */
export class HiveController {
  /**
   * GET method.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware function.
   */
  async getHiveStatus (req, res, next) {
    try {
      const { hiveId } = req.params // Extracting hiveId from the URL
      const hive = await HiveModel.findOne({ hiveId })
      if (!hive) {
        return res.status(404).json({ message: 'Hive not found' })
      }
      res.json(hive)
    } catch (error) {
      next(error)
    }
  }

  /**
   * GET method.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware function.
   */
  async getHiveHumidity (req, res, next) {
    try {
      const { hiveId } = req.query
      const hive = await HiveModel.findOne({ hiveId }, 'measurements.humidity')
      if (!hive) {
        return res.status(404).json({ message: 'Hive not found' })
      }
      res.json(hive.measurements)
    } catch (error) {
      next(error)
    }
  }

  /**
   * GET method.
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
      res.json(weightData)
    } catch (error) {
      next(error)
    }
  }

  /**
   * GET method.
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
      res.json(temperatureData)
    } catch (error) {
      next(error)
    }
  }

  /**
   * GET method.
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
      res.json(hive.beeFlow)
    } catch (error) {
      next(error)
    }
  }
}
