import { Document, Types } from 'mongoose';

export interface IEvent extends Document {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  shortDesc: string;
  category: 'technical' | 'non-technical' | 'workshop' | 'cultural';
  date: Date;
  time: string;
  venue: string;
  coordinator: string;
  contact: string;
  poster?: string;
  price: number;
  maxParticipants: number;
  registeredCount: number;
  isActive: boolean;
  prerequisites?: string;
  prizes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRegistration extends Document {
  _id: Types.ObjectId;
  registrationId: string;
  event: Types.ObjectId;
  user?: Types.ObjectId;
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

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

export interface EventListItem {
  _id: string;
  title: string;
  slug: string;
  shortDesc: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  price: number;
  maxParticipants: number;
  registeredCount: number;
  isActive: boolean;
  poster?: string;
}

export interface RegistrationPayload {
  eventId: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  rollNumber?: string;
  department?: string;
  year?: string;
  paymentMethod: string;
}
