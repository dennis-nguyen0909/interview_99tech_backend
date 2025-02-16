import mongoose, { Schema, Document, Types } from 'mongoose';
import { IUser } from './UserModel';

export interface IProduct extends Document {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  stock?: number;
  isAvailable?: boolean;
  sizes?: string[];
  colors?: string[];
  userId?: Types.ObjectId | IUser;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  sizes: {
    type: [String],
    required: true,
  },
  colors: {
    type: [String],
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',                 
    required: true,
  }
}, {
  timestamps: true,
  versionKey: false
});

ProductSchema.index({ name: 1, category: 1, userId: 1 });
ProductSchema.index({name:1})

const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);

export default ProductModel;
