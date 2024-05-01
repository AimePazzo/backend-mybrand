import express, { Router } from 'express';
import contactController from '../modules/contact/controller/contactController';
import authMiddleware from '../middlewares/authMiddleware';

const contactRouter: Router = express.Router();

/**
 * @swagger
 * definitions:
 *   Contact:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       subject:
 *         type: string
 *       message:
 *         type: string
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: apiKey
 *       name: authorization
 *       in: header
 */

/**
 * @swagger
 * /contact/send-message:
 *   post:
 *     summary: Send a message
 *     security:
 *       - bearerAuth: []
 *     description: Send a message
 *     parameters:
 *       - name: body
 *         description: Message data
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Contact'
 *     responses:
 *       200:
 *         description: Successfully sent the message
 *       500:
 *         description: Internal server error
 */

contactRouter.post('/send-message', contactController.postContact);

/**
 * @swagger
 * /contact/get-messages:
 *   get:
 *     summary: Get all messages
 *     security:
 *       - bearerAuth: []
 *     description: Get all messages
 *     responses:
 *       200:
 *         description: Successfully retrieved messages
 *       500:
 *         description: Internal server error
 */

contactRouter.get('/get-messages',authMiddleware.authenticateToken,authMiddleware.isAdmin, contactController.getAllContacts);

/**
 * @swagger
 * /contact/get-message/{id}:
 *   get:
 *     summary: Get a message by ID
 *     security:
 *       - bearerAuth: []
 *     description: Get a message by its ID
 *     parameters:
 *       - name: id
 *         description: Message ID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the message
 *       500:
 *         description: Internal server error
 */

contactRouter.get('/get-message/:id',authMiddleware.authenticateToken,authMiddleware.isAdmin, contactController.getContact);

/**
 * @swagger
 * /contact/update-message/{id}:
 *   put:
 *     summary: Update a message by ID
 *     security:
 *       - bearerAuth: []
 *     description: Update a message by its ID
 *     parameters:
 *       - name: id
 *         description: Message ID
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         description: Message data
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Contact'
 *     responses:
 *       200:
 *         description: Successfully updated the message
 *       500:
 *         description: Internal server error
 */

contactRouter.put('/update-message/:id',authMiddleware.authenticateToken,authMiddleware.isAdmin, contactController.updateContact);

/**
 * @swagger
 * /contact/delete-message/{id}:
 *   delete:
 *     summary: Delete a message by ID
 *     security:
 *       - bearerAuth: []
 *     description: Delete a message by its ID
 *     parameters:
 *       - name: id
 *         description: Message ID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the message
 *       500:
 *         description: Internal server error
 */

contactRouter.delete('/delete-message/:id',authMiddleware.authenticateToken,authMiddleware.isAdmin, contactController.deleteContact);

export default contactRouter;

