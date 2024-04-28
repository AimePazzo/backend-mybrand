import { generateToken } from "../../../database/config/jwtToken";
import { Request, Response } from "express"
import { validateMongoDbId } from "../../../utils/validateMongodbId";
import userRepository from "../repository/userRepository";
import emailController from "../../email/controller/emailController";
import dotenv from'dotenv';


dotenv.config();
const asyncHandler = require('express-async-handler')



// Create a new
const createUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // TODO: Get the email address from req.body
    const email: string = req.body.email;
    console.log(email);
    // TODO: Find the email address if it exists
    const findUser = await userRepository.findUser(email);
    if (!findUser) { 
        const newUser = await userRepository.createUser(req.body);
        const token = await userRepository.createToken(newUser._id);
        const url = `${process.env.BASE_URL_ONLINE}user/${newUser._id}/verify/${token.token}`;
        await emailController.verifyEmail(newUser.email,"Verify Email", url);
        res.status(200).json({ newUser: newUser, message: 'An Email sent to your account please verify' });
    } else {
        res.status(400).json({
            message: "User already exists"
        })
    }
});

// Verify user

const verifyUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const token: string = req.params.token;
    validateMongoDbId(id);
    const user = await userRepository.findUserById(id);
    if (user) {
        const verifyUser = await userRepository.verifyUser(id, token);
        console.log(verifyUser)
        if (verifyUser) {
            await userRepository.UpdateUserVerified(id);
            await userRepository.tokenRemove()
            res.redirect("public/verify.html");
        res.status(200).json({ message: "Email verified successfully" });
        } else {
        res.status(400).json({ message: 'Invalid Token' });
        }
    } else {
        res.status(400).json({
            message: "User not found"
        })
    }
}
)

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
    
        const deleteUser = await userRepository.deleteUser(id);
        if(deleteUser){
            res.status(200).json({deleteUser:deleteUser ,message:"User deleted successfully"});
            return
        }
        res.status(400).json({message:'User not found'})
    }
)

// Login a user

const loginUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const email: string = req.body.email;
    const password: string = req.body.password;

    const user = await userRepository.loginUser(email);
    if (user && (await user?.isPasswordMatched(password)) && user.verified) {
        const token = generateToken(user?._id);
        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.userName, 
            token: token
        });
    } else if(!user?.verified){
            let token = await userRepository.getToken(user?._id)
            if(!token){
                token = await userRepository.createToken(user?._id)
                const url = `${process.env.BASE_URL_ONLINE}user/${user?._id}/verify/${token.token}`;
                await emailController.verifyEmail(email,"Verify Email", url);
            }
            res.status(400).json({ message: 'An Email sent to your account please verify' });
    }
    else {
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

export default {createUser,getAllUsers,updateUser,deleteUser,loginUser,getUser,loginAdmin,verifyUser}