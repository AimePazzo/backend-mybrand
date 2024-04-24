import { Request, Response } from "express"
import { UserModel } from "../../../database/model/userModel"

const createUser = async (email: any) => {
    return await UserModel.findOne({ email: email });
}

const findUser = async (body:any) => {
    return await UserModel.findOne({ email: body.email });
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
            firstname: body.firstname,
            lastname: body.lastname,
            email: body.email,
            username: body.username,
        },
        { new: true });
}

const deleteUser = async (id: string) => {
    return await UserModel.findByIdAndDelete(id);
};

const loginUser = async (email:any) => {
    return await UserModel.findOne({ email: email});
};
export default { createUser, getAllUser, getUserById,updateUser, deleteUser, loginUser,findUser };