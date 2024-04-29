import express, { Router } from "express";
import emailController from "../modules/email/controller/emailController";

const sendEmailRouter : Router = express.Router();
/**
 * @swagger
 * /api/v1/email/send-email:
 *   post:
 *     summary: Send email
 *     description: Send an email to the specified recipient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       500:
 *         description: Internal server error
 */

sendEmailRouter.post('/send-email', emailController.sendEmail);

/**
 * @swagger
 * /api/v1/email/email-user:
 *   post:
 *     summary: Send email to user
 *     description: Send an email to a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email sent to user successfully
 *       500:
 *         description: Internal server error
 */
sendEmailRouter.post('/email-user', emailController.sendEmailToUser);


export default sendEmailRouter;
