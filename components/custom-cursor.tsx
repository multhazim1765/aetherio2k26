'use client';

import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    if (isTouchDevice) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer')
        );
        setIsPointer(isClickable);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Outer Crimson Halo */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      >
        <div
          className={`rounded-full border border-red-500/50 transition-all duration-200 ${
            isPointer ? 'w-10 h-10 bg-red-600/15 border-red-400 scale-125 shadow-[0_0_15px_rgba(230,0,26,0.5)]' : 'w-7 h-7'
          } -translate-x-1/2 -translate-y-1/2`}
        />
      </div>

      {/* Center Ember Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      >
        <div
          className={`rounded-full bg-red-500 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#e6001a] transition-all duration-150 ${
            isPointer ? 'w-2 h-2 bg-orange-400 shadow-[0_0_12px_#f97316]' : 'w-1.5 h-1.5'
          }`}
        />
      </div>
    </>
  );
}
