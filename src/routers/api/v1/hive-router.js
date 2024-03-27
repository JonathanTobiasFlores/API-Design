/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/check-indentation */
import express from 'express'
import { HiveController } from '../../../controllers/api/hive-controller.js'
import { authenticateJWT } from '../../../utils/authenticate-token.js'

export const router = express.Router()

const controller = new HiveController()

/**
 * @swagger
 * tags:
 *   name: Beehives
 *   description: API endpoints for managing beehives
 */

/**
 * @swagger
 * /api/v1/:
 *   get:
 *     summary: Get welcome message and API endpoints
 *     description: Retrieve information about API endpoints.
 *     tags: [Beehives]
 *     responses:
 *       200:
 *         description: Information about API endpoints.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Welcome to the Beehive Monitoring API
 *                 links:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       rel:
 *                         type: string
 *                         example: self
 *                       method:
 *                         type: string
 *                         example: GET
 *                       href:
 *                         type: string
 *                         example: /
 *                       title:
 *                         type: string
 *                         example: Get welcome message and API endpoints
 */
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Beehive Monitoring API',
    links: [
      { rel: 'self', method: 'GET', href: '/api/v1/' },
      { rel: 'hives-status', method: 'GET', href: '/api/v1/hive-status/{hiveId}', title: 'Get the status of a specific hive' },
      { rel: 'hives-humidity', method: 'GET', href: '/api/v1/hive-humidity?hiveId={hiveId}', title: 'Get humidity data for a specific hive' },
      { rel: 'hives-weight', method: 'GET', href: '/api/v1/hive-weight?hiveId={hiveId}', title: 'Get weight data for a specific hive' },
      { rel: 'hives-temperature', method: 'GET', href: '/api/v1/hive-temperature?hiveId={hiveId}', title: 'Get temperature data for a specific hive' },
      { rel: 'hives-flow', method: 'GET', href: '/api/v1/hive-flow?hiveId={hiveId}', title: 'Get arrival and departure flow data for a specific hive' },
      { rel: 'create-hive', method: 'POST', href: '/api/v1/create-hive', title: 'Create a new hive (Authenticated users only)' },
      { rel: 'delete-hive', method: 'DELETE', href: '/api/v1/delete-hive/{hiveId}', title: 'Delete a specific hive (Authenticated users only)' },
      { rel: 'update-hive', method: 'PUT', href: '/api/v1/update-hive/{hiveId}', title: 'Update a specific hive (Authenticated users only)' }
    ]
  })
})

/**
 * @swagger
 * /api/v1/hive-status/{hiveId}:
 *   get:
 *     summary: Get the status of a specific hive
 *     description: Retrieve the status of a specific hive by ID.
 *     tags: [Beehives]
 *     parameters:
 *       - in: path
 *         name: hiveId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the hive
 *     responses:
 *       200:
 *         description: Status of the hive.
 *       404:
 *         description: Hive not found
 *       500:
 *         description: Internal server error
 */
router.get('/hive-status/:hiveId', (req, res, next) => controller.getHiveStatus(req, res, next))

/**
 * @swagger
 * /api/v1/hive-humidity:
 *   get:
 *     summary: Get humidity data for a specific hive
 *     description: Retrieve humidity data for a specific hive by ID.
 *     tags: [Beehives]
 *     parameters:
 *       - in: query
 *         name: hiveId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the hive
 *     responses:
 *       200:
 *         description: Humidity data for the hive.
 *       404:
 *         description: Hive not found
 *       500:
 *         description: Internal server error
 */
router.get('/hive-humidity', (req, res, next) => controller.getHiveHumidity(req, res, next))

/**
 * @swagger
 * /api/v1/hive-weight:
 *   get:
 *     summary: Get weight data for a specific hive
 *     description: Retrieve weight data for a specific hive by ID.
 *     tags: [Beehives]
 *     parameters:
 *       - in: query
 *         name: hiveId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the hive
 *     responses:
 *       200:
 *         description: Weight data for the hive.
 *       404:
 *         description: Hive not found
 *       500:
 *         description: Internal server error
 */
router.get('/hive-weight', (req, res, next) => controller.getHiveWeight(req, res, next))

/**
 * @swagger
 * /api/v1/hive-temperature:
 *   get:
 *     summary: Get temperature data for a specific hive
 *     description: Retrieve temperature data for a specific hive by ID.
 *     tags: [Beehives]
 *     parameters:
 *       - in: query
 *         name: hiveId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the hive
 *     responses:
 *       200:
 *         description: Temperature data for the hive.
 *       404:
 *         description: Hive not found
 *       500:
 *         description: Internal server error
 */
router.get('/hive-temperature', (req, res, next) => controller.getHiveTemperature(req, res, next))

/**
 * @swagger
 * /api/v1/hive-flow:
 *   get:
 *     summary: Get flow data for a specific hive
 *     description: Retrieve arrival and departure flow data for a specific hive by ID.
 *     tags: [Beehives]
 *     parameters:
 *       - in: query
 *         name: hiveId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the hive
 *     responses:
 *       200:
 *         description: Flow data for the hive.
 *       404:
 *         description: Hive not found
 *       500:
 *         description: Internal server error
 */
router.get('/hive-flow', (req, res, next) => controller.getHiveFlow(req, res, next))

/**
 * @swagger
 * /api/v1/create-hive:
 *   post:
 *     summary: Create a new hive
 *     description: Create a new hive with specified details.
 *     tags: [Beehives]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hiveId:
 *                 type: string
 *                 example: hive
 *               name:
 *                 type: string
 *                 example: Orchard Hive
 *               location:
 *                 type: string
 *                 example: Orchard
 *               measurements:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     timestamp:
 *                       type: string
 *                       example: '2023-03-30T10:00:00Z'
 *                     temperature:
 *                       type: number
 *                       example: 35
 *                     weight:
 *                       type: number
 *                       example: 50.5
 *                     humidity:
 *                       type: number
 *                       example: 45
 *               beeFlow:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     timestamp:
 *                       type: string
 *                       example: '2023-03-30T10:00:00Z'
 *                     arrivals:
 *                       type: number
 *                       example: 200
 *                     departures:
 *                       type: number
 *                       example: 150
 *     responses:
 *       201:
 *         description: Hive created successfully.
 *       400:
 *         description: Bad request, invalid input data.
 *       401:
 *         description: Unauthorized, missing or invalid authentication token.
 *       500:
 *         description: Internal server error
 */
router.post('/create-hive', authenticateJWT, (req, res, next) => controller.createHive(req, res, next))

/**
 * @swagger
 * /api/v1/delete-hive/{hiveId}:
 *   delete:
 *     summary: Delete a specific hive (Authenticated users only)
 *     description: Delete a specific hive by ID.
 *     tags: [Beehives]
 *     parameters:
 *       - in: path
 *         name: hiveId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the hive
 *     responses:
 *       200:
 *         description: Hive deleted successfully.
 *       404:
 *         description: Hive not found
 *       401:
 *        description: Unauthorized, missing or invalid authentication token.
 *       500:
 *         description: Internal server error
 */
router.delete('/delete-hive/:hiveId', authenticateJWT, (req, res, next) => controller.deleteHive(req, res, next))

/**
 * @swagger
 * /api/v1/update-hive/{hiveId}:
 *   put:
 *     summary: Update a specific hive
 *     description: Update details of a specific hive by ID.
 *     tags: [Beehives]
 *     parameters:
 *       - in: path
 *         name: hiveId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the hive to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: updatedhive
 *               location:
 *                 type: string
 *                 example: updatedhill
 *     responses:
 *       200:
 *         description: Hive updated successfully.
 *       400:
 *         description: Bad request, invalid input data.
 *       401:
 *         description: Unauthorized, missing or invalid authentication token.
 *       404:
 *         description: Hive not found
 *       500:
 *         description: Internal server error
 */
router.put('/update-hive/:hiveId', authenticateJWT, (req, res, next) => controller.updateHive(req, res, next))
