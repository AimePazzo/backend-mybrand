import { Request, Response } from "express"
import contactRepository from "../repository/contactRepository";
import { validateMongoDbId } from "../../../utils/validateMongodbId";


const asyncHandler = require('express-async-handler')

// Create a new Contact object

const postContact = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    // TODO: Get the contact detail from req.body
    try {
        const contactData = {
            userName: req.body.userName,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message
        }
        // TODO: Find the email address if it exists
        const contact = await contactRepository.postContact(contactData);
        res.status(200).json({ ContactDetail: contact, message: 'Message sent' });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
});

// Get all Contacts

const getAllContacts = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const contacts = await contactRepository.getAllContact()
    res.status(200).json(contacts);
});

// Get a single Contact

const getContact = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    validateMongoDbId(id)
    try {
        const contact = await contactRepository.getContactById(id)
        res.status(200).json(contact);
    } catch (error) {
        throw new Error(String(error))
    }

});

// Update a contact

const updateContact = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const id: string = req.params.id;
        validateMongoDbId(id)
        const updateContact = await contactRepository.updateContact(id, req.body);
        res.status(200).json({ updateContact: updateContact });
    } catch (error) {
        throw new Error('user update error')
    }
});

// Delete a Contact

const deleteContact = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    validateMongoDbId(id)
    try {
        const deleteContact = await contactRepository.deleteContact(id);
        res.status(200).json(deleteContact);
    } catch (error) {
        throw new Error('User not found')
    }
});

export default { postContact, getAllContacts, updateContact, deleteContact, getContact }