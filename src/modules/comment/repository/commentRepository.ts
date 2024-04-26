import Comment from "../../../database/model/comments";

const postComment = async (body: any) => {
  return await Comment.create(body);
};

const getComments = async () => {
  return await Comment.find();
};

export default { postComment, getComments };
