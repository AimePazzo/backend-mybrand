import { Router } from "express";
import authRouter from "./authRouter";
import contactRouter from "./contactRouter";
import projectRouter from "./projectRouter";


const router = Router();

router.use('/user',authRouter);
router.use('/contact',contactRouter);
router.use('/project',projectRouter);


export default router;