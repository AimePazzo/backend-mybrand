import express, { Router } from 'express';
import projectController from '../modules/project/controller/projectController';
import upload from '../utils/multer'
import authMiddleware from '../middlewares/authMiddleware';



const projectRouter: Router = express.Router();

projectRouter.post('/post-project', authMiddleware.authenticateToken,
    authMiddleware.isAdmin,
    upload.single("image"), projectController.postProject);
projectRouter.get('/get-projects', projectController.getAllProjects);
projectRouter.get('/get-project/:id', projectController.getProject);
projectRouter.put('/update-project/:id', projectController.updateProject);
projectRouter.delete('/delete-project/:id', projectController.deleteProject);


export default projectRouter;
