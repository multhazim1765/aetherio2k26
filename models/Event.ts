import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
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
}

const EventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  shortDesc: { type: String, required: true, maxlength: 150 },
  category: {
    type: String,
    enum: ['technical', 'non-technical', 'workshop', 'cultural'],
    required: true,
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  coordinator: { type: String, required: true },
  contact: { type: String, required: true },
  poster: { type: String },
  price: { type: Number, default: 0 },
  maxParticipants: { type: Number, default: 100 },
  registeredCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  prerequisites: { type: String },
  prizes: { type: String },
}, { timestamps: true });

export default mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
