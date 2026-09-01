import mongoose, { Schema, Document } from 'mongoose';

export interface IRegistration extends Document {
  registrationId: string;
  event: mongoose.Types.ObjectId;
  user?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  college: string;
  rollNumber?: string;
  department?: string;
  year?: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod?: 'razorpay' | 'upi' | 'cash';
  paymentId?: string;
  orderId?: string;
  amount: number;
  utrNumber?: string;
  isAttended: boolean;
  certificateIssued: boolean;
  registeredAt: Date;
}

const RegistrationSchema = new Schema<IRegistration>({
  registrationId: { type: String, unique: true, required: true },
  event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  college: { type: String, required: true },
  rollNumber: { type: String },
  department: { type: String },
  year: { type: String },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
    enum: ['razorpay', 'upi', 'cash'],
  },
  paymentId: { type: String },
  orderId: { type: String },
  amount: { type: Number, required: true },
  utrNumber: { type: String },
  isAttended: { type: Boolean, default: false },
  certificateIssued: { type: Boolean, default: false },
  registeredAt: { type: Date, default: Date.now },
});

export default mongoose.models.Registration ||
  mongoose.model<IRegistration>('Registration', RegistrationSchema);
