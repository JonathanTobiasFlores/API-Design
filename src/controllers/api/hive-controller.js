import { HiveModel } from '../../models/hive-model.js'
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
}
