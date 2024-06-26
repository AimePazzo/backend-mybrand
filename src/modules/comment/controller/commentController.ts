import { Request, Response } from "express";
import commentRepository from "../repository/commentRepository";


interface ExtendedRequest extends Request {
  user?: string;
}

const postComment = async (req: ExtendedRequest, res: Response) => {
  try {
    const userId = req.user
    const id = req.params.id
    const data = await commentRepository.postComment(req.body,id, userId);
    return res.status(200).json({ status: 200, message: "Success", data });
  } catch (error) {
    return res.status(500).json({ status: 500, error: JSON.stringify(error) });
  }
};

const getComments = async (req: Request, res: Response) => {
  
    const data = await commentRepository.getComments();
    return res.status(200).json({ status: 200, message: "Success", data });
};

// TODO: get comment by id
const getCommentById = async (req: Request, res: Response) => {
  try {
    const data = await commentRepository.getCommentById(req.params.id);
    return res.status(200).json({ status: 200, message: "Success", data });
  } catch (error) {
    return res.status(500).json({ status: 500, error: JSON.stringify(error) });
  }
}

// update comment 

const updateCommentById = async (req: Request, res: Response) => {
  try {
    const id:string = req.params.id;
    const status = req.body.status;
    const data = await commentRepository.updateCommentById(id, status);
    return res.status(200).json({ status: 200, message: "Comment status updated successfully", data });
  } catch (error) {
    return res.status(500).json({ status: 500, error: JSON.stringify(error) });
  }
}

const deleteCommentById = async (req: Request, res: Response) => {
  try {
    const id:string = req.params.id;
    const data = await commentRepository.deleteCommentById(id);
    return res.status(200).json({ status: 200, message: "Comment deleted successfully", data });
  } catch (error) {
    return res.status(500).json({ status: 500, error: JSON.stringify(error) });
  }
}

const deleteCommentByProjectId = async(req:Request, res:Response) => {
  try {
    const id:string = req.params.id;
    const data = await commentRepository.deleteManyComments(id);
    return res.status(200).json({ status: 200, message: "Comment deleted successfully", data });
  } catch (error) {
    return res.status(500).json({ status: 500, error: JSON.stringify(error) });
  }
}

export default { postComment, getComments, getCommentById,updateCommentById,deleteCommentById,deleteCommentByProjectId};
