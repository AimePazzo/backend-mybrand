import Comment from "../../../database/model/comments";

const postComment = async (body: any, id: any,userId:any) => {
    return await Comment.create({
        project: id,
        comment: body.comment,
        user: userId,
        rating: body.rating
    });
};

const getComments = async () => {
    return await Comment.find().populate('User');
};

export default { postComment, getComments };
