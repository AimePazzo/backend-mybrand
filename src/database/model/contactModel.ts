import { Schema, model, Document } from "mongoose";

interface Contact extends Document {
  userName: string;
  email: string;
  subject: string;
  message: string;
  status: string;
}

const contactSchema = new Schema<Contact>(
  {
    userName: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
    },
    subject: {
      type: 'string',
      required: true,
    },
    message: {
      type: 'string',
      required: true,
    },
    status: {
        type: 'string',
        default: "Submitted",
        enum: ["Submitted", "Contacted", "In Progress", "Resolved"],
      },
  },
  {
    timestamps: true,
  }
);

const ContactModel = model<Contact>("Contact", contactSchema);

export { ContactModel, Contact };
