import { Schema, model, Document } from "mongoose";

interface Project extends Document {
    title: string;
    images: string[];
    description: string;
    field: string;
}

const projectSchema = new Schema<Project>(
    {
        title: {
            type: 'string',
            required: true,
        },
        images: [{
            public_id: 'string',
            url: 'string',
            
        },],
        description: {
            type: 'string',
            required: true,
        },
        field: {
            type: 'string',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const ProjectModel = model<Project>("Project", projectSchema);

export default ProjectModel;
