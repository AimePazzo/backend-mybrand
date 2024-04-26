import mongoose, { Document, Model, Schema } from "mongoose";

interface CommentsType extends Document {
    project: any;
    comment: string
    user: any
    rating: number
}

const commentSchema: Schema <CommentsType> = new Schema({
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Project',
        required: true
    },
    comment: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user is required']
        },
    rating: { type: Number, required: [true, 'rating is required'] },
    },
    {
        timestamps: true
    
})

const Comment:Model<CommentsType>=mongoose.model<CommentsType>('Comment', commentSchema);

export default Comment;