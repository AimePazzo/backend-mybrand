import { Request, Response } from "express";
import commentRepository from "../repository/commentRepository";

const postComment = async (req: Request, res: Response) => {
  try {
    const data = await commentRepository.postComment(req.body);
    return res.status(200).json({ status: 200, message: "Success", data });
  } catch (error) {
    return res.status(500).json({ status: 500, error: JSON.stringify(error) });
  }
};

const getComments = async (req: Request, res: Response) => {
  try {
    const data = await commentRepository.getComments();
    return res.status(200).json({ status: 200, message: "Success", data });
  } catch (error) {
    return res.status(500).json({ status: 500, error: JSON.stringify(error) });
  }
};

export default { postComment, getComments };
