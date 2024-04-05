import jwt from 'jsonwebtoken'

// eslint-disable-next-line jsdoc/require-returns
/**
 * Authenticates requests.
 *
 * If authentication is successful, `req.user`is populated and the
 * request is authorized to continue.
 * If authentication fails, an unauthorized response will be sent.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const authenticateJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing.' })
    }

    const [authenticationScheme, token] = authHeader.split(' ')
    if (authenticationScheme !== 'Bearer') {
      return res.status(401).json({ message: 'Invalid authentication scheme.' })
    }

    const payload = jwt.verify(token, process.env.PUBLIC_KEY, { algorithms: ['RS256'] })
    if (!payload.username || !payload.id) {
      return res.status(401).json({ message: 'Invalid token payload.' })
    }

    req.user = { username: payload.username, id: payload.id }
    next()
  } catch (error) {
    // Provide a specific error message for failed authentication
    return res.status(401).json({ message: 'Invalid or expired token.' })
  }
}
