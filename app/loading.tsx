import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
      <Loader2 className="w-8 h-8 animate-spin text-[#4f46e5]" />
    </div>
  );
}
