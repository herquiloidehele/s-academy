import React from "react";

function SummaryCard({ icon, title, value, tooltip, percentageChange, changeType, iconBgColor }) {
  return (
    <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
      <div className="p-4 md:p-5 flex gap-x-4">
        <div
          className={`shrink-0 flex justify-center items-center w-[46px] h-[46px] rounded-lg ${iconBgColor || "bg-gray-100 dark:bg-neutral-800"}`}
        >
          {icon}
        </div>
        <div className="grow">
          <div className="flex items-center gap-x-2">
            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">{title}</p>
            {tooltip && (
              <div className="hs-tooltip">
                <div className="hs-tooltip-toggle">
                  <svg
                    className="shrink-0 w-4 h-4 text-gray-500 dark:text-neutral-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                  <span
                    className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700"
                    role="tooltip"
                  >
                    {tooltip}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="mt-1 flex items-center gap-x-2">
            <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">{value}</h3>
            {percentageChange && (
              <span
                className={`inline-flex items-center gap-x-1 py-0.5 px-2 rounded-full ${
                  changeType === "increase"
                    ? "bg-green-100 text-green-900 dark:bg-green-800 dark:text-green-100"
                    : "bg-red-100 text-red-900 dark:bg-red-800 dark:text-red-100"
                }`}
              >
                <svg
                  className="inline-block w-4 h-4 self-center"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {changeType === "increase" ? (
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  ) : (
                    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                  )}
                  <polyline points={changeType === "increase" ? "16 7 22 7 22 13" : "16 17 22 17 22 11"} />
                </svg>
                <span className="inline-block text-xs font-medium">{percentageChange}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;
