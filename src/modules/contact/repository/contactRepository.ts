import { Request, Response } from "express"
import { ContactModel } from "../../../database/model/contactModel";

const postContact = async (body:any) => {
    return await ContactModel.create(body);
}

const getAllContact = async () => {
    return await ContactModel.find();
}

const getContactById = async (id: string) => {
    return await ContactModel.findById(id);
}

const updateContact = async (id:string, body:any) => {
    return await ContactModel.findByIdAndUpdate(id,
        body,
        { new: true });
}

const deleteContact = async (id: string) => {
    return await ContactModel.findByIdAndDelete(id);
};

export default { postContact, getAllContact, getContactById,updateContact, deleteContact };