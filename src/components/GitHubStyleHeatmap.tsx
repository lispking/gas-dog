import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';

interface GitHubStyleHeatmapProps {
  title: string;
  data: { date: string; value: number }[];
  loading?: boolean;
  error?: Error | null;
}

const getColor = (value: number, max: number) => {
  if (!value) return '#ebedf0';
  const ratio = value / max;
  if (ratio <= 0.2) return '#9be9a8';
  if (ratio <= 0.4) return '#40c463';
  if (ratio <= 0.6) return '#30a14e';
  if (ratio <= 0.8) return '#216e39';
  return '#1b4c30';
};

export const GitHubStyleHeatmap: React.FC<GitHubStyleHeatmapProps> = ({
  title,
  data,
  loading,
  error
}) => {
  if (loading) {
    return <div className="animate-pulse h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>;
  }

  if (error) {
    return <div className="text-red-500">Error loading data</div>;
  }

  const today = new Date();
  const startDate = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
  const maxValue = Math.max(...data.map(item => item.value), 1);

  // 确保所有日期都有数据，没有数据的日期设为0
  const formattedValues = React.useMemo(() => {
    const dateMap = new Map(data.map(item => [item.date, item.value]));
    const allDates = [];
    const current = new Date(startDate);
    
    while (current <= today) {
      const dateStr = current.toISOString().split('T')[0];
      allDates.push({
        date: dateStr,
        count: dateMap.get(dateStr) || 0
      });
      current.setDate(current.getDate() + 1);
    }
    return allDates;
  }, [data, startDate, today]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        {title}
      </h3>
      <div className="overflow-x-auto">
        <div style={{ minWidth: '800px' }}>
          <CalendarHeatmap
            startDate={startDate}
            endDate={today}
            values={formattedValues}
            showWeekdayLabels
            weekdayLabels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
            transformDayElement={(element, value, index) => {
              if (!value) return element;
              return React.cloneElement(element, {
                'data-tooltip-id': 'react-tooltip',
                'data-tooltip-content': `${value.date}: ${value.count.toFixed(2)}`
              });
            }}
            classForValue={(value) => {
              if (!value || !value.count) return 'color-empty';
              const ratio = value.count / maxValue;
              if (ratio <= 0.25) return 'color-scale-1';
              if (ratio <= 0.5) return 'color-scale-2';
              if (ratio <= 0.75) return 'color-scale-3';
              return 'color-scale-4';
            }}
          />
          <ReactTooltip id="react-tooltip" />
        </div>
      </div>
      
      <div className="flex items-center justify-end gap-2 text-sm text-gray-600 mt-6">
        <span className="text-xs">Less</span>
        {[0, 0.2, 0.4, 0.6, 0.8, 1].map((level, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: getColor(level, 1) }}
          />
        ))}
        <span className="text-xs">More</span>
      </div>
    </div>
  );
};
