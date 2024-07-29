"use client";
import React from "react";
import Lottie from "react-lottie";

interface EmptyStateProps {
  animationData: any;
  title: string;
  description: string;
  children?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ animationData, title, description, children }) => {
  const lottieDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center py-8 bg-white shadow-md rounded-md">
      <Lottie options={lottieDefaultOptions} height={400} width={400} />
      <span className="text-gray-600 font-semibold text-lg mt-4">{title}</span>
      <p className="text-gray-400 text-sm mt-2">{description}</p>
      {children}
    </div>
  );
};

export default EmptyState;
