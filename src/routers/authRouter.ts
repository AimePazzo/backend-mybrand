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
 *         example: John
 *       lastName:
 *         type: string
 *         example: Doe
 *       userName:
 *         type: string
 *         example: johndoe
 *       email:
 *         type: string
 *         example: john.doe@example.com
 *       password:
 *         type: string
 *         example: mypassword
 */

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Signup a new user
 *     requestBody:
 *       description: User data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               userName:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: mypassword
 *     responses:
 *       200:
 *         description: Return created user and message
 *         schema:
 *           type: object
 *           properties:
 *             newUser:
 *               $ref: '#/definitions/User'
 *             message:
 *               type: string
 *             token:
 *               type: string
 *       400:
 *         description: Bad request
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *         examples:
 *           missingFields:
 *             value:
 *               status: "fail"
 *               message: "Missing required fields: firstName, lastName, userName, email, password"
 */


authRouter.post('/signup', userController.createUser);


/**
 * @swagger
 * /user/get-users:
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
 * /user/get-user/{id}:
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

authRouter.get('/user/get-user/:id', userController.getUser);

/**
 * @swagger
 * /user/update-user/{id}:
 *   put:
 *     summary: Update user by ID
 *     description: Update user details by ID in the database
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
 *             role:
 *               type: string
 *           example:
 *             firstName: John
 *             lastName: Doe
 *             userName: johndoe
 *             email: john.doe@example.com
 *             role: user
 *     responses:
 *       200:
 *         description: Return updated user
 *         schema:
 *           $ref: '#/definitions/User'
 */



authRouter.put('/update-user/:id', userController.updateUser);

/**
 * @swagger
 * /user/delete-user/{id}:
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
 * /user/login:
 *   post:
 *     summary: Login user
 *     description: Login user and return authentication token
 *     requestBody:
 *       description: User credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *           example:
 *             email: john.doe@example.com
 *             password: mypassword
 *     responses:
 *       200:
 *         description: Return user details and authentication token
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             userName:
 *               type: string
 *             email:
 *               type: string
 *             role:
 *               type: string
 *             token:
 *               type: string
 *             message:
 *               type: string
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


authRouter.post('/login', userController.loginUser);


/**
 * @swagger
 * /user/admin-login:
 *   post:
 *     summary: Login admin
 *     description: Login admin and return authentication token
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: Admin credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: ndagijimanapazo64@gmail.com
 *               password:
 *                 type: string
 *                 example: mypassword
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
 * /user/{id}/verify/{token}:
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