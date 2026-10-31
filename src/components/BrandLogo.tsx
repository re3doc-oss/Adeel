import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  className = '',
  size = 'md',
}) => {
  const heightClass = size === 'sm' ? 'h-9' : size === 'lg' ? 'h-14' : 'h-11';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Real sliced crisp logo from reference design */}
      <img
        src={variant === 'dark' ? '/images/logo-footer.png' : '/images/logo.png'}
        alt="Al Adeel Advertising LLC Logo"
        className={`${heightClass} w-auto object-contain transition-transform hover:scale-[1.02]`}
        onError={(e) => {
          // Fallback to inline styled SVG if image fails
          const target = e.currentTarget;
          target.style.display = 'none';
        }}
      />
    </div>
  );
};
