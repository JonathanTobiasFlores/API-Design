/**
 *
 */
export class ResourceController {
  /**
   * POST method.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware function.
   */
  async POST (req, res, next) {
    res.json({ message: 'Postis-Per' })
  }

  /**
   * GET method.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware function.
   */
  async GET (req, res, next) {
    res.json({ message: 'Gettis-Get' })
  }

  /**
   * PUT method.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware function.
   */
  async PUT (req, res, next) {
  }

  /**
   * PATCH method.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware function.
   */
  async PATCH (req, res, next) {
  }

  /**
   * DELETE method.
   *
   * @param {object} req The request object.
   * @param {object} res The response object.
   * @param {Function} next The next middleware function.
   */
  async DELETE (req, res, next) {
  }
}
