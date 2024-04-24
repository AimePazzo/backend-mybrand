import express, { Router } from 'express';
import userController from '../modules/user/controller/userController';


const authRouter: Router = express.Router();

authRouter.post('/signup', userController.createUser);
authRouter.get('/get-users', userController.getAllUsers);
authRouter.get('/get-user/:id', userController.getUser);
authRouter.put('/update-user/:id', userController.updateUser);
authRouter.delete('/delete-user/:id', userController.deleteUser);
authRouter.post('/login', userController.loginUser);
authRouter.post('/admin-login', userController.loginAdmin);

export default authRouter;
