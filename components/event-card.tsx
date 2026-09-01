'use client';

import Link from 'next/link';
import { Calendar, MapPin, Users, IndianRupee } from 'lucide-react';
import { EventListItem } from '@/types';

interface EventCardProps {
  event: EventListItem;
}

export default function EventCard({ event }: EventCardProps) {
  const isFull = event.registeredCount >= event.maxParticipants;
  const isFree = event.price === 0;

  const categoryColors: Record<string, string> = {
    technical: 'bg-[#4f46e5]/20 text-[#818cf8]',
    'non-technical': 'bg-[#10b981]/20 text-[#34d399]',
    workshop: 'bg-[#f59e0b]/20 text-[#fbbf24]',
    cultural: 'bg-[#ec4899]/20 text-[#f472b6]',
  };

  return (
    <div className="bg-[#111118] border border-[#1e1e2e] rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:shadow-[#4f46e5]/5 transition-all duration-200">
      <div className="h-40 bg-gradient-to-br from-[#312e81] to-[#4f46e5] relative">
        {event.poster ? (
          <img src={event.poster} alt={event.title} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full text-white text-4xl font-bold opacity-30">
            {event.title[0]}
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${categoryColors[event.category] || 'bg-gray-800 text-gray-400'}`}>
            {event.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-1">{event.title}</h3>
        <p className="text-[#9ca3af] text-sm mb-4 line-clamp-2">{event.shortDesc}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-[#9ca3af]">
            <Calendar className="w-4 h-4 mr-2 text-[#6b7280]" />
            {new Date(event.date).toLocaleDateString('en-IN')} at {event.time}
          </div>
          <div className="flex items-center text-sm text-[#9ca3af]">
            <MapPin className="w-4 h-4 mr-2 text-[#6b7280]" />
            {event.venue}
          </div>
          <div className="flex items-center text-sm text-[#9ca3af]">
            <Users className="w-4 h-4 mr-2 text-[#6b7280]" />
            {event.registeredCount} / {event.maxParticipants} registered
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#1e1e2e]">
          <div className="flex items-center text-lg font-bold text-white">
            <IndianRupee className="w-4 h-4" />
            {isFree ? 'Free' : event.price}
          </div>

          <Link
            href={`/events/${event.slug}`}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
              isFull
                ? 'bg-[#1e1e2e] text-[#6b7280] cursor-not-allowed'
                : 'bg-[#4f46e5] text-white hover:bg-[#4338ca]'
            }`}
          >
            {isFull ? 'Full' : 'View Details'}
          </Link>
        </div>
      </div>
    </div>
  );
}
