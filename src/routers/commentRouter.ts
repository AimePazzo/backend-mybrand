import { Request, Response, Router } from "express";
import commentControllers from "../modules/comment/controller/commentController";
import authMiddleware from "../middlewares/authMiddleware";

const commentRouter = Router();


/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: Comment routes
 * /comments/post-comment/{id}:
 *   post:
 *     summary: Post a comment
 *     security:
 *       - bearerAuth: []
 *     description: Post a comment on a specific post
 *     parameters:
 *       - name: id
 *         description: Post ID
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         description: Comment data
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             comment:
 *               type: string
 *     responses:
 *       200:
 *         description: Successfully posted a comment
 *       500:
 *         description: Internal server error
 */

commentRouter.post("/post-comment/:id", authMiddleware.authenticateToken, commentControllers.postComment)

/**
 * @swagger
 * /comments/get-comments:
 *   get:
 *     summary: Get all comments
 *     security:
 *       - bearerAuth: []
 *     description: Get all comments
 *     responses:
 *       200:
 *         description: Successfully retrieved comments
 *       500:
 *         description: Internal server error
 */
commentRouter.get("/get-comments", authMiddleware.authenticateToken, commentControllers.getComments);

/**
 * @swagger
 * /comments/get-comment/{id}:
 *   get:
 *     summary: Get a comment by ID
 *     security:
 *       - bearerAuth: []
 *     description: Get a comment by its ID
 *     parameters:
 *       - name: id
 *         description: Comment ID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the comment
 *       500:
 *         description: Internal server error
 */
commentRouter.get("/get-comment/:id", authMiddleware.authenticateToken, commentControllers.getCommentById);


/**
 * @swagger
 * /comment/update-comment/{id}:
 *   put:
 *     summary: Update comment status by ID
 *     security:
 *       - bearerAuth: []
 *     description: Updates the status of a comment based on the provided comment ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Comment ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Comment status update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - Approval
 *                   - Pending
 *                   - Not Approved
 *                 default: Pending
 *     responses:
 *       '200':
 *         description: Comment status updated successfully
 *       '400':
 *         description: Invalid input or bad request
 *       '401':
 *         description: Unauthorized (requires authentication)
 *       '403':
 *         description: Forbidden (requires admin privileges)
 *       '404':
 *         description: Comment not found
 *       '500':
 *         description: Internal server error
 */

commentRouter.put("/update-comment/:id", authMiddleware.authenticateToken, authMiddleware.isAdmin, commentControllers.updateCommentById);
export default commentRouter;
