import express, { Router } from 'express';
import userController from '../modules/user/controller/userController';


const authRouter: Router = express.Router();


/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       userName:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 */

/**
 * @swagger
 * /api/v1/user/signup:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user and send a verification email
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             userName:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Return created user and message
 *         schema:
 *           $ref: '#/definitions/User'
 */


authRouter.post('/signup', userController.createUser);


/**
 * @swagger
 * /api/v1/user/get-users:
 *   get:
 *     summary: Get all users
 *     description: Get all users from the database
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 */

authRouter.get('/get-users', userController.getAllUsers);

/**
 * @swagger
 * /api/v1/user/get-user/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Get user details by ID from the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's ID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Return user details
 *         schema:
 *           $ref: '#/definitions/User'
 */

authRouter.get('/get-user/:id', userController.getUser);

/**
 * @swagger
 * /api/v1/user/update-user/{id}:
 *   put:
 *     summary: Update user by ID
 *     description: Update user details by ID in the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's ID
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Return updated user
 *         schema:
 *           $ref: '#/definitions/User'
 */

authRouter.put('/update-user/:id', userController.updateUser);

/**
 * @swagger
 * /api/v1/user/delete-user/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Delete user by ID from the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's ID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Return deleted user
 *         schema:
 *           $ref: '#/definitions/User'
 */

authRouter.delete('/delete-user/:id', userController.deleteUser);


/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: Login user
 *     description: Login user and return authentication token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: User credentials
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Return user details and authentication token
 *         schema:
 *           $ref: '#/definitions/User'
 */

authRouter.post('/login', userController.loginUser);


/**
 * @swagger
 * /api/v1/user/admin-login:
 *   post:
 *     summary: Login admin
 *     description: Login admin and return authentication token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Admin credentials
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Return admin details and authentication token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 username:
 *                   type: string
 *                 token:
 *                   type: string
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */


authRouter.post('/admin-login', userController.loginAdmin);


/**
 * @swagger
 * /api/user/{id}/verify/{token}:
 *   get:
 *     summary: Verify user
 *     description: Verify user using token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's ID
 *         in: path
 *         required: true
 *         type: string
 *       - name: token
 *         description: Verification token
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User verified successfully
 *       400:
 *         description: Invalid token
 */

authRouter.get('/:id/verify/:token', userController.verifyUser);


export default authRouter;