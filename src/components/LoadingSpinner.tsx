import React from "react";

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
}) => {
  return <p className="text-center mt-5">{message}</p>;
};

export default LoadingSpinner;
