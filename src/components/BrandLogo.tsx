import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${sizeMap[size]} ${className}`}>
      {/* Outer sculpted metallic / gold container with 3D bevel effect matching the shop board */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_2px_8px_rgba(200,157,66,0.25)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Metallic Silver-Chrome with Champagne Gold sheen inspired by the real signboard */}
          <linearGradient id="emMetallicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#E2E8F0" />
            <stop offset="70%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          <linearGradient id="emGoldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFB86C" />
            <stop offset="50%" stopColor="#C89D42" />
            <stop offset="100%" stopColor="#876022" />
          </linearGradient>

          {/* Depth / drop filter */}
          <filter id="shadow3D" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="1" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Outer stylized stylized aerodynamic 'E' monogram from signboard */}
        <g filter="url(#shadow3D)">
          {/* Outer sweeping loop of E with top serif hook & lower wrap */}
          <path
            d="M84 22 C64 19, 44 20, 30 25 C16 30, 11 40, 13 58 C15 76, 26 83, 44 83 C62 83, 76 80, 85 73 L79 61 C72 66, 60 69, 47 69 C36 69, 29 65, 27 55 C26 47, 28 39, 36 35 C44 32, 59 31, 74 33 L84 22 Z"
            fill="url(#emMetallicGrad)"
            stroke="url(#emGoldBorder)"
            strokeWidth="2"
          />

          {/* Integrated Inner 'M' monogram block nestled within E's crossbar pocket */}
          <rect
            x="34"
            y="43"
            width="34"
            height="21"
            rx="3"
            fill="url(#emMetallicGrad)"
            stroke="url(#emGoldBorder)"
            strokeWidth="1.5"
          />

          {/* Sharp cut 'M' cutout in the center block */}
          <path
            d="M40 59 L40 47 L46 54 L52 47 L52 59 L48.5 59 L48.5 52 L46 55 L43.5 52 L43.5 59 Z"
            fill="#0B1528"
          />
        </g>
      </svg>
    </div>
  );
};
