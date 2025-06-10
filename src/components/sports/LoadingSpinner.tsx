
import React from "react";

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className = "py-16" }) => {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tjk-blue"></div>
    </div>
  );
};

export default LoadingSpinner;
