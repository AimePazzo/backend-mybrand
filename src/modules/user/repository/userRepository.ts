import { Request, Response } from "express"
import { UserModel } from "../../../database/model/userModel"
import tokenModel from "../../../database/model/token";
import crypto from 'crypto'

const createUser = async (body: any) => {
    return await UserModel.create({
        firstName: body.firstName,
        lastName: body.lastName,
        userName:body.userName,
        email:body.email,
        password:body.password
    });
}

const createToken = async (body: any) => {
    return await tokenModel.create({ userID: body,token:crypto.randomBytes(32).toString('hex')  });
}


const findUserById = async (body: any) => {
    return await UserModel.findOne({ _id: body });
}

const getToken = async (id: any) => {
    return await tokenModel.findOne({userID: id});
}
const findUser = async (body: any) => {
    return await UserModel.findOne({ email: body });
}

const verifyUser = async (id: string, token: string) => {
    return await tokenModel.findOne({ userID: id, token: token });
}

const getAllUser = async () => {
    return await UserModel.find();
}

const getUserById = async (id: string) => {
    return await UserModel.findById(id);
}

const updateUser = async (body: any) => {
    return await UserModel.findByIdAndUpdate(body.id,
        {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            username: body.username,
        },
        { new: true });
}

const UpdateUserVerified = async (id: string) => {
    return await UserModel.findByIdAndUpdate(id,
        {
            verified: true,
        },
        { new: true });
};

const tokenRemove = async() => {
    return await tokenModel.deleteMany()
}

const deleteUser = async (id: string) => {
    return await UserModel.findByIdAndDelete(id);
};

const loginUser = async (email: any) => {
    return await UserModel.findOne({ email: email });
};
export default {
     createUser,
     createToken,
     verifyUser,
     findUserById,
     getToken,
     getAllUser,
     getUserById,
     updateUser,
     UpdateUserVerified,
     tokenRemove,
     deleteUser,
     loginUser,
     findUser };