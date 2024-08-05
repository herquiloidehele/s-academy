import React, { useEffect, useRef } from "react";

const ProgressBar = ({ percentage }) => {
  const progressBarRef = useRef(null);

  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${percentage}%`;
    }
  }, [percentage]);

  if (!percentage || 0) return null;
  return (
    <div className="relative w-full h-2 bg-gray-200 rounded-lg overflow-hidden">
      <div ref={progressBarRef} className="absolute h-full bg-primary" style={{ transition: "width 0.3s" }}></div>
      <span className="absolute inset-0 flex items-center justify-center text-black font-semibold text-xs">
        {`${Math.round(percentage)}%`}
      </span>
    </div>
  );
};

export default ProgressBar;
