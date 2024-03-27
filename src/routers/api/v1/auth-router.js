import express from 'express'
import { AuthController } from '../../../controllers/api/auth-controller.js'

export const router = express.Router()

const controller = new AuthController()

router.get('/', (req, res) => {
  res.json({
    message: 'Authentication endpoint',
    links: [
      { rel: 'login', method: 'POST', href: '/api/v1/auth/login', title: 'Authenticate a user' },
      { rel: 'register', method: 'POST', href: '/api/v1/auth/register', title: 'Register a new user' }
    ]
  })
})

router.post('/login', (req, res, next) => controller.login(req, res, next))

router.post('/register', (req, res, next) => controller.register(req, res, next))
