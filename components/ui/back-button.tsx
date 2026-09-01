'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface BackButtonProps {
  href?: string;
  label?: string;
  className?: string;
}

export default function BackButton({ href, label = 'Back', className = '' }: BackButtonProps) {
  const router = useRouter();

  if (href) {
    return (
      <Link
        href={href}
        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/60 hover:bg-black/80 border border-red-500/30 text-xs font-mono font-medium text-slate-300 hover:text-white hover:border-red-500 shadow-sm transition-all group backdrop-blur-md ${className}`}
      >
        <ArrowLeft className="w-3.5 h-3.5 text-red-400 group-hover:-translate-x-0.5 transition-transform" />
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/60 hover:bg-black/80 border border-red-500/30 text-xs font-mono font-medium text-slate-300 hover:text-white hover:border-red-500 shadow-sm transition-all group backdrop-blur-md ${className}`}
    >
      <ArrowLeft className="w-3.5 h-3.5 text-red-400 group-hover:-translate-x-0.5 transition-transform" />
      <span>{label}</span>
    </button>
  );
}
