import { Request, Response } from "express";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'ndagijimanapazo64@gmail.com',
           pass: 'dkzxldvdsjayxjj'
       }
   });
const sendEmail = async (req:Request, res:Response) => {
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

};

export default sendEmail;