import { Request, Response } from "express";
import projectRepository from "../repository/projectRepository";
import { validateMongoDbId } from "../../../utils/validateMongodbId";
import uploadImages from "./uploadController";
import asyncHandler from 'express-async-handler';

// Create a new project
const postProject = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        
        if (!req.file) {
            res.status(400).json({
                message: "Please upload an image"
            });
            return;
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
        };
        const project = await projectRepository.postProject(projectData);
        res.status(200).json({ projectDetail: project, message: 'Project Created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Get all projects
const getAllProjects = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const projects = await projectRepository.getAllProject();
        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Get a single project
const getProject = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const id: string = req.params.id;
        validateMongoDbId(id);
        const project = await projectRepository.getProjectById(id);
        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Update a project
const updateProject = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({
                message: "Please upload an image"
            });
            return;
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
        };
        validateMongoDbId(id);
        const updateProject = await projectRepository.updateProject(id, projectData);
        res.status(200).json({ updateProject: updateProject,message:"Project updated successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Delete a project
const deleteProject = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const id: string = req.params.id;
        validateMongoDbId(id);
        await projectRepository.deleteProject(id);
        res.status(200).json({ message: "Project and associated comments deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

export default { postProject, getAllProjects, updateProject, deleteProject, getProject };
