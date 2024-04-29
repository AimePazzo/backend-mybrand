import express, { Router } from 'express';
import contactController from '../modules/contact/controller/contactController';

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
 * /api/v1/contact/send-message:
 *   post:
 *     summary: Send a message
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
 * /api/v1/contact/get-messages:
 *   get:
 *     summary: Get all messages
 *     description: Get all messages
 *     responses:
 *       200:
 *         description: Successfully retrieved messages
 *       500:
 *         description: Internal server error
 */

contactRouter.get('/get-messages', contactController.getAllContacts);

/**
 * @swagger
 * /api/v1/contact/get-message/{id}:
 *   get:
 *     summary: Get a message by ID
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

contactRouter.get('/get-message/:id', contactController.getContact);

/**
 * @swagger
 * /api/v1/contact/update-message/{id}:
 *   put:
 *     summary: Update a message by ID
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

contactRouter.put('/update-message/:id', contactController.updateContact);

/**
 * @swagger
 * /api/v1/contact/delete-message/{id}:
 *   delete:
 *     summary: Delete a message by ID
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

contactRouter.delete('/delete-message/:id', contactController.deleteContact);

export default contactRouter;

