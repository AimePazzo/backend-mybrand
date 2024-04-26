import mongoose, { Document, Model, Schema } from "mongoose";

interface CommentsType extends Document {
    title: string;
    description: string
    user: any
    rating: number
}

const commentSchema: Schema <CommentsType> = new Schema({
    title: { type: String, required:[ true, 'title is required']},
    description: String,
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