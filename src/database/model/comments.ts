import mongoose, { Document, Model, Schema } from "mongoose";

export interface CommentsType extends Document {
    project: mongoose.Schema.Types.ObjectId;
    comment: string;
    user: mongoose.Schema.Types.ObjectId;
    rating: number;
    status:any;
}

const commentSchema: Schema <CommentsType> = new Schema({
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Project',
        required: true,
        cascade: true,
    },
    comment: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user is required'],
        cascade: true,
        },
    rating: { type: Number, required: [true, 'rating is required'] },
    status: {
        type: 'string',
        default: "Pending",
        enum: ["Pending", "Approval", "Not Approved"],
      },
    },
    
    {
        timestamps: true
    
})

const Comment:Model<CommentsType>=mongoose.model<CommentsType>('Comment', commentSchema);

export default Comment;