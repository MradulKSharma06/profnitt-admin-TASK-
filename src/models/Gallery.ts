import mongoose, { Schema } from 'mongoose'

const GallerySchema = new Schema({
    imageUrl: String,
    tags: [String],
    caption: String,
    uploadedBy: String,
    views: { type: Number, default: 0 },
    edits: { type: Number, default: 0 },
    deletions: { type: Number, default: 0 },
}, { timestamps: { createdAt: 'uploadedAt', updatedAt: true } })

export default mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema)
