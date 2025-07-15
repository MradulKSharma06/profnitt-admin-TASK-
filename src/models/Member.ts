import mongoose, { Schema } from 'mongoose'

const MemberSchema = new Schema({
    name: String,
    role: String,
    type: { type: String, enum: ['Core', 'Manager', 'Coordinator'] },
    photoUrl: String,
    bio: String,
    linkedinUrl: String,
    addedBy: String,
    edits: { type: Number, default: 0 },
    deletions: { type: Number, default: 0 },
}, { timestamps: true })

export default mongoose.models.Member || mongoose.model('Member', MemberSchema)
