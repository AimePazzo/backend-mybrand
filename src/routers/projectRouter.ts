import express, { Router } from 'express';
import projectController from '../modules/project/controller/projectController';
import upload from '../utils/multer'
import authMiddleware from '../middlewares/authMiddleware';

const projectRouter: Router = express.Router();

/**
 * @swagger
 * /api/project/post-project:
 *   post:
 *     summary: Post a project
 *     description: Post a project
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Bearer token
 *         required: true
 *         type: string
 *       - name: title
 *         in: formData
 *         type: string
 *         required: true
 *       - name: description
 *         in: formData
 *         type: string
 *         required: true
 *       - name: field
 *         in: formData
 *         type: string
 *         required: true
 *       - name: image
 *         in: formData
 *         type: file
 *     responses:
 *       200:
 *         description: Successfully posted the project
 *       400:
 *         description: Bad request. Image not provided.
 *       500:
 *         description: Internal server error
 */

projectRouter.post('/post-project', authMiddleware.authenticateToken,
    authMiddleware.isAdmin,
    upload.single("image"),projectController.postProject);

/**
 * @swagger
 * /api/project/get-projects:
 *   get:
 *     summary: Get all projects
 *     description: Get all projects
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Bearer token
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved projects
 *       500:
 *         description: Internal server error
 */

projectRouter.get('/get-projects',authMiddleware.authenticateToken, projectController.getAllProjects);

/**
 * @swagger
 * /api/project/get-project/{id}:
 *   get:
 *     summary: Get a project by ID
 *     description: Get a project by its ID
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Bearer token
 *         required: true
 *         type: string
 *       - name: id
 *         description: Project ID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the project
 *       500:
 *         description: Internal server error
 */

projectRouter.get('/get-project/:id',authMiddleware.authenticateToken, projectController.getProject);

/**
 * @swagger
 * /api/project/update-project/{id}:
 *   put:
 *     summary: Update a project by ID
 *     description: Update a project by its ID
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Bearer token
 *         required: true
 *         type: string
 *       - name: id
 *         description: Project ID
 *         in: path
 *         required: true
 *         type: string
 *       - name: title
 *         in: formData
 *         type: string
 *         required: true
 *       - name: description
 *         in: formData
 *         type: string
 *         required: true
 *       - name: field
 *         in: formData
 *         type: string
 *         required: true
 *       - name: image
 *         in: formData
 *         type: file
 *     responses:
 *       200:
 *         description: Successfully updated the project
 *       400:
 *         description: Bad request. Image not provided.
 *       500:
 *         description: Internal server error
 */

projectRouter.put('/update-project/:id',authMiddleware.authenticateToken,authMiddleware.isAdmin,upload.single("image"), projectController.updateProject);

/**
 * @swagger
 * /api/project/delete-project/{id}:
 *   delete:
 *     summary: Delete a project by ID
 *     description: Delete a project by its ID
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Bearer token
 *         required: true
 *         type: string
 *       - name: id
 *         description: Project ID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the project
 *       500:
 *         description: Internal server error
 */

projectRouter.delete('/delete-project/:id',authMiddleware.authenticateToken,authMiddleware.isAdmin, projectController.deleteProject);

export default projectRouter;
