import Comment from "../../../database/model/comments";

const postComment = async (body: any, id: any, userId: any) => {
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
    return await Comment.find({project:id}).populate('user').populate('project');
};

const deleteManyComments = async (id: string) => {
    return await Comment.deleteMany({ project: id });
}

const deleteCommentById = async (id: string) => {
    return await Comment.findByIdAndDelete(id);
}

const updateCommentById = async (id: string, status: any) => {
    return await Comment.findOneAndUpdate(
        { project: id },
        { status: status }, // Update the status with the value from the request body
        { new: true }
    );
}


export default { postComment, getComments, getCommentById, deleteManyComments, updateCommentById, deleteCommentById};
