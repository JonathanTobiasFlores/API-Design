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
    res.json({ message: 'Gettis-Get' })
  }

  /**
   * GET method.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware function.
   */
  async getHiveHumidity (req, res, next) {
    res.json({ message: 'Gettis-Get' })
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
