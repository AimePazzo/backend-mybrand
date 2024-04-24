import { generateToken } from "../../../database/config/jwtToken";
import { Request, Response } from "express"
import { validateMongoDbId } from "../../../utils/validateMongodbId";
import userRepository from "../repository/userRepository";
import { UserModel } from "../../../database/model/userModel";

const asyncHandler = require('express-async-handler')

// Create a new

const createUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // TODO: Get the email address from req.body
    const email: string = req.body.email;
    // TODO: Find the email address if it exists
    const findUser = await userRepository.createUser(email);
    if (!findUser) {
        const newUser = await UserModel.create(req.body)
        res.status(200).json({ newUser: newUser, message: 'User Created successful' });
    } else {
        res.status(400).json({
            message: "User already exists"
        })
    }
});

// Get all users

const getAllUsers = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const users = await userRepository.getAllUser()
    res.status(200).json(users);
});

// Get a single user

const getUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    validateMongoDbId(id)
    try {
        const user = await userRepository.getUserById(id)
        res.status(200).json(user);
    } catch (error) {
        throw new Error(String(error))
    }

});

// Update a user

const updateUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const userData = {
            id: req.params.id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            username: req.body.username,
        }
        const updateUser = await userRepository.updateUser(userData);
        res.status(200).json({ updateUser: updateUser });
    } catch (error) {
        throw new Error('user update error')
    }
});

// Delete a user

const deleteUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    validateMongoDbId(id)
    try {
        const deleteUser = await userRepository.deleteUser(id);
        res.status(200).json(deleteUser);
    } catch (error) {
        throw new Error('User not found')
    }
});

// Login a user

const loginUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const email: string = req.body.email;
    const password: string = req.body.password;

    const user = await userRepository.loginUser(email);

    if (user && (await user?.isPasswordMatched(password))) {
        const token = generateToken(user?._id);
        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.userName,
            token: token
        });
    } else {
        res.status(401).json({
            message: "Invalid credentials"
        });
    }
});


// Login a admin

const loginAdmin = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const email: string = req.body.email;
    const password: string = req.body.password;

    const findAdmin = await userRepository.loginUser(email);
    if (findAdmin?.role !== "admin") throw new Error("Not Authorised");
    if (findAdmin && (await findAdmin?.isPasswordMatched(password))) {
        const token = generateToken(findAdmin?._id);
        res.status(200).json({
            _id: findAdmin._id,
            firstName: findAdmin.firstName,
            lastName: findAdmin.lastName,
            email: findAdmin.email,
            username: findAdmin.userName,
            token: token,
            message:"login successful"
        });
    } else {
        res.status(401).json({
            message: "Invalid credentials"
        });
    }
});

export default {createUser,getAllUsers,updateUser,deleteUser,loginUser,getUser,loginAdmin}