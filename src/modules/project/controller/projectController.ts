import { Request, Response } from "express"
import projectRepository from "../repository/projectRepository";
import { validateMongoDbId } from "../../../utils/validateMongodbId";
import userRepository from "../../user/repository/userRepository";
import emailController from "../../email/controller/emailController";
import uploadImages from "./uploadController";
import commentRepository from "../../comment/repository/commentRepository";
import asyncHandler from 'express-async-handler';

// Create a new Contact object

const postProject = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // TODO: Get the project detail from req.body
    try {
        if(!req.file){
            res.status(400).json({
                message: "Please upload an image"
            })
        }
        const result = await uploadImages(req.file);
        const projectData = {
            title: req.body.title,
            description: req.body.description,
            images: [{
                public_id: result?.public_id,
                url: result?.secure_url,
            }],
            field: req.body.field
        }
        
        // TODO: Find the email address if it exists
        const project = await projectRepository.postProject(projectData);
        res.status(200).json({ projectDetail: project, message: 'Project Created successful!' });
        // Send email to all users
        const users = await userRepository.getAllUser();
        const emailPromises = users.map(async (user) => {
            const url = `${process.env.BASE_URL}/projects/${project._id}`;
            await emailController.verifyEmail(user.email, "New Project Added", `A new project has been added. Click here to view: ${url}`);
        });
        await Promise.all(emailPromises);
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
});

// Get all projects

const getAllProjects = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const projects = await projectRepository.getAllProject()
    res.status(200).json(projects);
});

// Get a single project

const getProject = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    validateMongoDbId(id)
    try {
        const project = await projectRepository.getProjectById(id)
        res.status(200).json(project);
    } catch (error) {
        throw new Error(String(error))
    }

});

// Update a project

const updateProject = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        if(!req.file){
            res.status(400).json({
                message: "Please upload an image"
            })
        }
        const result = await uploadImages(req.file);
        const id: string = req.params.id;
        const projectData = {
            title: req.body.title,
            description: req.body.description,
            images: [{
                public_id: result?.public_id,
                url: result?.secure_url,
            }],
            field: req.body.field
        }
        validateMongoDbId(id)
        const updateProject = await projectRepository.updateProject(id, projectData);
        res.status(200).json({ updateProject: updateProject });
    } catch (error) {
        throw new Error('user update error')
    }
});

// Delete a project

const deleteProject = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    validateMongoDbId(id)
    try {
         await projectRepository.deleteProject(id);
         await commentRepository.deleteManyComments(id);
         res.status(200).json({message:" Project and associated comments deleted"});
    } catch (error) {
        throw new Error('User not found')
    }
});

export default { postProject, getAllProjects, updateProject, deleteProject, getProject }