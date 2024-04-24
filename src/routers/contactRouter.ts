import express, { Router } from 'express';
import contactController from '../modules/contact/controller/contactController';


const contactRouter: Router = express.Router();

contactRouter.post('/send-message', contactController.postContact);
contactRouter.get('/get-messages', contactController.getAllContacts);
contactRouter.get('/get-message/:id', contactController.getContact);
contactRouter.put('/update-message/:id', contactController.updateContact);
contactRouter.delete('/delete-message/:id', contactController.deleteContact);


export default contactRouter;
