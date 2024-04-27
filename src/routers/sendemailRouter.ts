import express, { Router } from "express";
import emailController from "../modules/email/controller/emailController";

const sendEmailRouter : Router = express.Router();

/**
 * @swagger
 * /api/v1/email/send-email:
 *   post:
 *     summary: Send email
 *     description: Send an email to the specified recipient
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             to:
 *               type: string
 *             subject:
 *               type: string
 *             text:
 *               type: string
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       500:
 *         description: Internal server error
 */
sendEmailRouter.post('/api/v1/email/send-email', emailController.sendEmail);

/**
 * @swagger
 * /api/v1/email/email-user:
 *   post:
 *     summary: Send email to user
 *     description: Send an email to a user
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *             subject:
 *               type: string
 *             text:
 *               type: string
 *     responses:
 *       200:
 *         description: Email sent to user successfully
 *       500:
 *         description: Internal server error
 */
sendEmailRouter.post('/api/v1/email/email-user', emailController.sendEmailToUser);

export default sendEmailRouter;
