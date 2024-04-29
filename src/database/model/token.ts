import mongoose, { Schema } from "mongoose";
import crypto from 'crypto';

export interface IToken extends Document {
   token: string;
   userID:mongoose.Schema.Types.ObjectId;
   createdAt:Date;
  }

const tokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})


export default mongoose.model<IToken>('Token', tokenSchema);