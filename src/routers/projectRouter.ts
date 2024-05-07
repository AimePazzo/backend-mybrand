import express, { Router } from 'express';
import projectController from '../modules/project/controller/projectController';
import upload from '../utils/multer'
import authMiddleware from '../middlewares/authMiddleware';

const projectRouter: Router = express.Router();

/**
 * @swagger
 * /project/post-project:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Post a project
 *     description: Post a project
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Project image
 *                 in: formData
 *               title:
 *                 type: string
 *                 description: Project title
 *                 in: formData
 *               description:
 *                 type: string
 *                 description: Project description
 *                 in: formData
 *               field:
 *                 type: string
 *                 description: Project field
 *                 in: formData
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
 * /project/get-projects:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all projects
 *     description: Get all projects
 *     responses:
 *       200:
 *         description: Successfully retrieved projects
 *       500:
 *         description: Internal server error
 */



projectRouter.get('/get-projects',authMiddleware.authenticateToken, projectController.getAllProjects);
/**
 * @swagger
 * /project/get-project/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a project by ID
 *     description: Get a project by its ID
 *     parameters:
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
 * /project/update-project/{id}:
 *   put:
 *     summary: Update a project by ID
 *     description: Update a project by its ID
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Project ID
 *                 in: path
 *                 required: true
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Project image
 *                 in: formData
 *               title:
 *                 type: string
 *                 description: Project title
 *                 in: formData
 *               description:
 *                 type: string
 *                 description: Project description
 *                 in: formData
 *               field:
 *                 type: string
 *                 description: Project field
 *                 in: formData
 *     responses:
 *       200:
 *         description: Successfully updated the project
 *       400:
 *         description: Bad request. Image not provided.
 *       500:
 *         description: Internal server error
 */

projectRouter.put('/update-project/:id',authMiddleware.authenticateToken,authMiddleware.isAdmin,upload.single("image"),projectController.updateProject);

/**
 * @swagger
 * /project/delete-project/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a project by ID
 *     description: Delete a project by its ID
 *     parameters:
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
