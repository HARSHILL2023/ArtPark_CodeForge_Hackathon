import React from 'react';

export default function FloatingCube3D({ size = 48, className = '' }) {
  const half = size / 2;

  return (
    <div
      className={`inline-block ${className}`}
      style={{
        width: size,
        height: size,
        perspective: 800,
      }}
    >
      <style>{`
        @keyframes tumble3D {
          0% { transform: rotateX(15deg) rotateY(0deg) rotateZ(0deg); }
          50% { transform: rotateX(45deg) rotateY(180deg) rotateZ(30deg); }
          100% { transform: rotateX(15deg) rotateY(360deg) rotateZ(0deg); }
        }
      `}</style>
      <div
        className="w-full h-full relative"
        style={{
          transformStyle: 'preserve-3d',
          animation: 'tumble3D 12s linear infinite',
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-md border border-[#2563EB]/40 dark:border-[#3B82F6]/50 bg-[#2563EB]/10 dark:bg-[#3B82F6]/15 backdrop-blur-xs flex items-center justify-center text-[10px] font-mono text-[#2563EB] dark:text-[#3B82F6]"
          style={{ transform: `translateZ(${half}px)` }}
        />
        {/* Back */}
        <div
          className="absolute inset-0 rounded-md border border-[#2563EB]/30 dark:border-[#3B82F6]/40 bg-[#2563EB]/10 dark:bg-[#3B82F6]/10 backdrop-blur-xs"
          style={{ transform: `rotateY(180deg) translateZ(${half}px)` }}
        />
        {/* Right */}
        <div
          className="absolute inset-0 rounded-md border border-[#2563EB]/40 dark:border-[#3B82F6]/50 bg-[#2563EB]/15 dark:bg-[#3B82F6]/20 backdrop-blur-xs"
          style={{ transform: `rotateY(90deg) translateZ(${half}px)` }}
        />
        {/* Left */}
        <div
          className="absolute inset-0 rounded-md border border-[#2563EB]/30 dark:border-[#3B82F6]/40 bg-[#2563EB]/10 dark:bg-[#3B82F6]/10 backdrop-blur-xs"
          style={{ transform: `rotateY(-90deg) translateZ(${half}px)` }}
        />
        {/* Top */}
        <div
          className="absolute inset-0 rounded-md border border-[#60A5FA]/50 dark:border-[#60A5FA]/60 bg-[#60A5FA]/20 dark:bg-[#60A5FA]/25 backdrop-blur-xs"
          style={{ transform: `rotateX(90deg) translateZ(${half}px)` }}
        />
        {/* Bottom */}
        <div
          className="absolute inset-0 rounded-md border border-[#1D4ED8]/40 dark:border-[#1D4ED8]/50 bg-[#1D4ED8]/10 dark:bg-[#1D4ED8]/15 backdrop-blur-xs"
          style={{ transform: `rotateX(-90deg) translateZ(${half}px)` }}
        />
      </div>
    </div>
  );
}
