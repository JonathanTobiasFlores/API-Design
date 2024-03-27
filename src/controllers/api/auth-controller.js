/* eslint-disable jsdoc/require-returns */
import jwt from 'jsonwebtoken'
import { User } from '../../models/user-model.js'

/**
 *
 */
export class AuthController {
  /**
   * Authenticates a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async login (req, res, next) {
    try {
      if (!req.body.username || !req.body.password) {
        return res.status(400).json({ error: 'Username and password are required.' })
      }
      const user = await User.authenticate(req.body.username, req.body.password)

      if (!user) {
        // This is a generic message for failed authentication to avoid enumeration attacks
        return res.status(401).json({ error: 'Invalid credentials. Please try again.' })
      }

      const payload = {
        username: user.username,
        id: user.id
      }
      const accessTokenLife = parseInt(process.env.ACCESS_TOKEN_LIFE)
      const accessToken = jwt.sign(payload, process.env.PRIVATE_KEY, {
        algorithm: 'RS256',
        expiresIn: accessTokenLife
      })

      res.status(200).json({
        access_token: accessToken,
        links: [
          { rel: 'self', method: 'POST', href: '/api/v1/auth/login', title: 'Log in' },
          { rel: 'register', method: 'POST', href: '/api/v1/auth/register', title: 'Register a new account' }
        ]
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Registers a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async register (req, res, next) {
    try {
      // Directly create the user with req.body as the password will be hashed automatically
      const user = await User.create({
        username: req.body.username,
        password: req.body.password // Password will be hashed by the pre save middleware
      })

      // Respond with the user id and username but not the password or other sensitive info
      res.status(201).json({
        id: user.id,
        username: user.username,
        links: [
          { rel: 'self', method: 'POST', href: '/api/v1/auth/register', title: 'Register a new account' },
          { rel: 'login', method: 'POST', href: '/api/v1/auth/login', title: 'Log in with this account' }
        ]
      })
    } catch (error) {
      if (error.code === 11000) {
        // Handle duplicate key errors, such as a username
        res.status(409).json({ message: 'Username already exists.' })
      } else {
        // For other types of errors, pass them to the error handling middleware
        next(error)
      }
    }
  }
}
