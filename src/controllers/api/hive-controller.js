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
    res.json({ message: 'Gettis-Get' })
  }

  /**
   * GET method.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware function.
   */
  async getHiveTemperature (req, res, next) {
    res.json({ message: 'Gettis-Get' })
  }

  /**
   * GET method.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware function.
   */
  async getHiveFlow (req, res, next) {
    res.json({ message: 'Gettis-Get' })
  }
}
