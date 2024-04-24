import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  userName:string;
  email: string;
  role: string;
  password: string;
  passwordChangedAt:Date;
  passwordResetToken:string;
  passwordResetExpires:Date;
  timestamps: boolean;
  isPasswordMatched:(password:string) => string;
}

const UserSchema: Schema = new Schema({
    firstName:{type: 'string',required: true},
    lastName: {type: 'string', required: true},
    userName:{type:'string', required: true},
    role: {
      type: 'string',
      default: "user",
    },
    email: {type:'string', required: true},
    password: { type: 'string', required: true},
    passwordChangedAt:Date,
    passwordResetToken: String,
    passwordResetExpires:Date,
},{
  timestamps: true,
});

UserSchema.pre('save',async function (next) {
  const user = this as unknown as IUser;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();

});
UserSchema.methods.isPasswordMatched = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword,this.password);
};

UserSchema.methods.createPasswordResetToken = async function () {
  const resettoken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
  .createHash('sha256')
  .update(resettoken)
  .digest('hex');
  this.passwordResetExpires = Date.now() + 3600000;
  return resettoken;
}

export const UserModel = mongoose.model<IUser>('User', UserSchema);