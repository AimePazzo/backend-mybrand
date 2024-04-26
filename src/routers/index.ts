import { Router } from "express";
import authRouter from "./authRouter";
import contactRouter from "./contactRouter";
import projectRouter from "./projectRouter";
import commentRouter from "./commentRouter";
import sendEmailRouter from "./sendemailRouter";


const router = Router();

router.use('/user',authRouter);
router.use("/comments", commentRouter);
router.use('/contact',contactRouter);
router.use('/project',projectRouter);
router.use('/email',sendEmailRouter)

export default router;