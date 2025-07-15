import mongoose, { Schema } from 'mongoose'

const GallerySchema = new Schema({
    imageUrls: [String],          
    tags: [String],
    caption: String,
    uploadedBy: String,
    views: { type: Number, default: 0 },
    edits: { type: Number, default: 0 },
    deletions: { type: Number, default: 0 },
    title:String
}, { timestamps: { createdAt: 'uploadedAt', updatedAt: true } })

export default mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema)
