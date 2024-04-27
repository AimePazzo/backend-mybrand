import express, { Router } from "express";
import emailController from "../modules/email/controller/emailController";

const sendEmailRouter :Router = express.Router();

sendEmailRouter.post('/send-email',emailController.sendEmail);
sendEmailRouter.post('/email-user',emailController.sendEmailToUser);

export default sendEmailRouter;