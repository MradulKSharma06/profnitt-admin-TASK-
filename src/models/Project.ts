import mongoose, { Schema } from 'mongoose'

const ProjectSchema = new Schema({
    title: String,
    description: String,
    technologies: [String],
    status: { type: String, enum: ['ongoing', 'completed'] },
    githubUrl: String,
    demoUrl: String,
    createdBy: String,
    views: { type: Number, default: 0 },
    edits: { type: Number, default: 0 },
    deletions: { type: Number, default: 0 },
}, { timestamps: true })

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema)
