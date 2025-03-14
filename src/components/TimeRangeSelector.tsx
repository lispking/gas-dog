import React from "react";
import { TimeRange } from "../types";
import { useTranslation } from "react-i18next";

interface TimeRangeSelectorProps {
  selectedTimeRange: TimeRange;
  onSelectTimeRange: (timeRange: TimeRange) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  selectedTimeRange,
  onSelectTimeRange,
}) => {
  const { t } = useTranslation();

  const timeRangeOptions = [
    { value: TimeRange.DAY, label: t("time_range.day") },
    { value: TimeRange.WEEK, label: t("time_range.week") },
    { value: TimeRange.MONTH, label: t("time_range.month") },
    { value: TimeRange.QUARTER, label: t("time_range.quarter") },
    { value: TimeRange.YEAR, label: t("time_range.year") },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        {t("time_range.title")}
      </h2>
      <div className="flex flex-wrap gap-2">
        {timeRangeOptions.map((range) => (
          <button
            key={range.value}
            onClick={() => onSelectTimeRange(range.value)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTimeRange === range.value
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeRangeSelector;
