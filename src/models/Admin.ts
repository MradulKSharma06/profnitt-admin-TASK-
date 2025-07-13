import mongoose, { Schema, Document } from 'mongoose'

export interface AdminDocument extends Document {
  name: string
  email: string
  password: string
  role: 'admin'
  createdAt: Date
  updatedAt: Date
}

const AdminSchema = new Schema<AdminDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      enum: ['superadmin', 'admin'],
      default: 'admin',
    },
  },
  {
    timestamps: true, 
  }
)

export const Admin = mongoose.models.Admin || mongoose.model<AdminDocument>('Admin', AdminSchema)
