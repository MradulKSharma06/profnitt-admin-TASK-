import mongoose, { Schema } from 'mongoose'

const EventSchema = new Schema({
    title: String,
    description: String,
    date: Date,
    venue: String,
    tags: [String],
    imageUrl: String,
    createdBy: String,
    views: { type: Number, default: 0 },
    edits: { type: Number, default: 0 },
    deletions: { type: Number, default: 0 },
    eventType: String
}, { timestamps: true })

export default mongoose.models.Event || mongoose.model('Event', EventSchema)
