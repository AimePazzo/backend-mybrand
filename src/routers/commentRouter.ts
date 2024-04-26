import Router from "express";
import commentControllers from "../modules/comment/controller/commentController";
import authMiddleware from "../middlewares/authMiddleware";

const commentRouter = Router();
commentRouter.post("/post-comment/:id",authMiddleware.authenticateToken, commentControllers.postComment)
commentRouter.get("/get-comments",authMiddleware.authenticateToken, commentControllers.getComments);
commentRouter.get("/get-comment/:id",authMiddleware.authenticateToken,authMiddleware.isAdmin, commentControllers.getCommentById);

export default commentRouter;
