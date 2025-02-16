import mongoose, { Schema, Document } from 'mongoose';

// Interface User
export interface IUser extends Document {
  email: string;
  password: string;
  fullName: string;
  avatar?: string;
  phone?: string;
  isActive: boolean;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

// Schema definition
const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  }
}, {
  timestamps: true,
  versionKey: false
});

// Create index for email
UserSchema.index({ email: 1 });

// Export model
const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
