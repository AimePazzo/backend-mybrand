import Comment from "../../../database/model/comments";

const postComment = async (body: any, id:any) => {
  return await Comment.create({
    title: body.title,
    description: body.description,
    user: id,
    rating:body.rating
  });
};

const getComments = async () => {
  return await Comment.find().populate('User');
};

export default { postComment, getComments };
