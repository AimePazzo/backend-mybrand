import { Request, Response } from "express"
import  ProjectModel  from "../../../database/model/projectModel";

const postProject = async (body:any) => {
    return await ProjectModel.create(body);
}

const getAllProject = async () => {
    return await ProjectModel.find();
}

const getProjectById = async (id: string) => {
    return await ProjectModel.findById(id);
}

const updateProject = async (id:string, body:any) => {
    return await ProjectModel.findByIdAndUpdate(id,
        body,
        { new: true });
}

const deleteProject = async (id: string) => {
    return await ProjectModel.findByIdAndDelete(id);
};

export default { postProject, getAllProject, getProjectById,updateProject, deleteProject };