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
    <div className="flex flex-wrap gap-2">
      {timeRangeOptions.map((range) => (
        <button
          key={range.value}
          onClick={() => onSelectTimeRange(range.value)}
          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
            selectedTimeRange === range.value
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
};

export default TimeRangeSelector;
