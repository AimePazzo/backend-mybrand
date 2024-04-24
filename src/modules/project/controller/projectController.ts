import { Request, Response } from "express"
import projectRepository from "../repository/projectRepository";
import { validateMongoDbId } from "../../../utils/validateMongodbId";
import { resourceLimits } from "worker_threads";
import uploadImages from "./uploadController";


const asyncHandler = require('express-async-handler')

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
        console.log(result)
        const projectData = {
            title: req.body.title,
            description: req.body.description,
            images: [{
                public_id: result?.public_id,
                url: result?.secure_url,
            }],
            field: req.body.field
        }
        console.log(projectData)
        // TODO: Find the email address if it exists
        const project = await projectRepository.postProject(projectData);
        res.status(200).json({ projectDetail: project, message: 'Message sent' });
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
        const id: string = req.params.id;
        validateMongoDbId(id)
        const updateProject = await projectRepository.updateProject(id, req.body);
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
        const deleteProject = await projectRepository.deleteProject(id);
        res.status(200).json(deleteProject);
    } catch (error) {
        throw new Error('User not found')
    }
});

export default { postProject, getAllProjects, updateProject, deleteProject, getProject }