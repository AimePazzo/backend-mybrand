import { Request, Response, Router } from "express";
import commentControllers from "../modules/comment/controller/commentController";
import authMiddleware from "../middlewares/authMiddleware";

const commentRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: Comment routes
 * /api/comments/post-comment/{id}:
 *   post:
 *     summary: Post a comment
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
commentRouter.post("/api/comments/post-comment/:id", authMiddleware.authenticateToken, commentControllers.postComment)

/**
 * @swagger
 * /api/comments/get-comments:
 *   get:
 *     summary: Get all comments
 *     description: Get all comments
 *     responses:
 *       200:
 *         description: Successfully retrieved comments
 *       500:
 *         description: Internal server error
 */
commentRouter.get("/api/comments/get-comments", authMiddleware.authenticateToken, commentControllers.getComments);

/**
 * @swagger
 * /api/comments/get-comment/{id}:
 *   get:
 *     summary: Get a comment by ID
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
commentRouter.get("/api/comments/get-comment/:id", authMiddleware.authenticateToken, authMiddleware.isAdmin, commentControllers.getCommentById);

export default commentRouter;
