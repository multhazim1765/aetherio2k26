'use client';

import React from 'react';

/**
 * Mobile-Only Fixed Background Video Component (max-width: 768px / md:hidden)
 * Fixed in background while page content scrolls over it naturally.
 */
export function MobileHeroVideo() {
  return (
    <div className="mobile-video-background fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden md:hidden">
      {/* Dark gradient overlay for smooth text contrast */}
      <div className="mobile-video-overlay absolute inset-0 bg-black/40 bg-gradient-to-b from-black/50 via-black/30 to-[#040203]/90 z-10 pointer-events-none" />

      {/* Clear, Sharp, Fixed Playing Mobile Background Video */}
      <video
        ref={(v) => {
          if (v) {
            v.muted = true;
            v.play().catch(() => {});
          }
        }}
        src="/mobile-bg.mp4"
        className="w-full h-full object-cover object-center opacity-100 pointer-events-none z-0"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
}

/**
 * Desktop-Only Fixed Background Video Component (min-width: 769px / hidden md:block)
 * UNTOUCHED & UNCHANGED DESKTOP IMPLEMENTATION
 */
export function DesktopBackgroundVideo() {
  return (
    <div className="hidden md:block fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#060203]">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-[#060203]/90 z-10" />
      <video
        src="/hero-dragon-2.mp4"
        className="w-full h-full object-cover object-center opacity-90 transition-all duration-300"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
}

export default function BackgroundVideo() {
  return (
    <>
      <MobileHeroVideo />
      <DesktopBackgroundVideo />
    </>
  );
}
