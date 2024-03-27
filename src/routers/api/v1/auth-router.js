/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */
import express from 'express'
import { AuthController } from '../../../controllers/api/auth-controller.js'

export const router = express.Router()

const controller = new AuthController()

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

/**
 * @swagger
 * /api/v1/auth:
 *   get:
 *     summary: Get authentication endpoint
 *     description: Retrieve information about authentication endpoints.
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Information about authentication endpoints.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authentication endpoint
 *                 links:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       rel:
 *                         type: string
 *                         example: login
 *                       method:
 *                         type: string
 *                         example: POST
 *                       href:
 *                         type: string
 *                         example: /api/v1/auth/login
 *                       title:
 *                         type: string
 *                         example: Authenticate a user
 */
router.get('/', (req, res) => {
  res.json({
    message: 'Authentication endpoint',
    links: [
      { rel: 'login', method: 'POST', href: '/api/v1/auth/login', title: 'Authenticate a user' },
      { rel: 'register', method: 'POST', href: '/api/v1/auth/register', title: 'Register a new user' }
    ]
  })
})

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticate a user using username and password.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: user123
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User authenticated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Username and password are required.
 *       401:
 *         description: Invalid credentials.
 *       500:
 *         description: Internal server error.
 */
router.post('/login', (req, res, next) => controller.login(req, res, next))

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with a username and password.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: user123
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 60a13e42c4fdd38b14f3be47
 *                 username:
 *                   type: string
 *                   example: user123
 *       409:
 *         description: Username already exists
 *       500:
 *         description: Internal server error
 */
router.post('/register', (req, res, next) => controller.register(req, res, next))
