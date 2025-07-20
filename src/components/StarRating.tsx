import React from 'react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  maxRating = 5, 
  size = 'md',
  showNumber = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-500';
    if (rating >= 3) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getRatingBadgeColor = (rating: number) => {
    if (rating >= 4) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    if (rating >= 3) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`flex items-center ${sizeClasses[size]}`}>
        {[...Array(maxRating)].map((_, index) => (
          <span
            key={index}
            className={`${
              index < rating 
                ? getRatingColor(rating)
                : 'text-gray-300 dark:text-gray-600'
            }`}
          >
            ★
          </span>
        ))}
      </div>
      {showNumber && (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRatingBadgeColor(rating)}`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;