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
    return await Comment.find().populate('user').populate('project');
};

const getCommentById = async (id: string) => {
    return await Comment.findById(id).populate('user').populate('project');
};

const deleteManyComments = async (id: string) => {
    return await Comment.deleteMany({ project: id });
}

export default { postComment, getComments,getCommentById,deleteManyComments };
