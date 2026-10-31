import React from 'react';

export const UaeFlag: React.FC<{ className?: string }> = ({ className = 'w-5 h-3.5' }) => {
  return (
    <svg
      viewBox="0 0 600 300"
      className={`inline-block rounded-xs shadow-xs border border-gray-200 ${className}`}
      aria-label="UAE Flag"
    >
      {/* 3 Horizontal bars */}
      <rect width="600" height="100" fill="#00732F" />
      <rect y="100" width="600" height="100" fill="#FFFFFF" />
      <rect y="200" width="600" height="100" fill="#000000" />
      {/* Vertical red bar */}
      <rect width="150" height="300" fill="#FF0000" />
    </svg>
  );
};
