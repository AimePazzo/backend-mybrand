import Router from "express";
import commentControllers from "../modules/comment/controller/commentController";

const commentRouter = Router();
commentRouter.post("/post-comment", commentControllers.postComment)
commentRouter.get("/get-comments", commentControllers.getComments);

export default commentRouter;
