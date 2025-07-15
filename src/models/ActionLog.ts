import mongoose, { Schema } from 'mongoose'

const ActionLogSchema = new Schema({
    action: { type: String, enum: ['create', 'update', 'delete', 'view'] },
    targetType: { type: String, enum: ['event', 'project', 'member', 'gallery'] },
    targetId: { type: Schema.Types.ObjectId },
    performedBy: String,
    timestamp: { type: Date, default: Date.now },
})

export default mongoose.models.ActionLog || mongoose.model('ActionLog', ActionLogSchema)
