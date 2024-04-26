import express, { Router } from "express";
import sendEmail from "../modules/email/controller/emailControler";

const sendEmailRouter :Router = express.Router();

sendEmailRouter.post('/send-email',sendEmail);

export default sendEmailRouter;