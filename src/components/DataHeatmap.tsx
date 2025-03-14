import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import '../styles/heatmap.css';

interface DataHeatmapProps {
    title: string;
    data: Array<{ date: string; count: number }>;
    loading?: boolean;
    isFormat?: boolean;
    tips: string;
}

const DataHeatmap: React.FC<DataHeatmapProps> = ({ title, data, loading, isFormat, tips }) => {
    if (loading) return <div>Loading...</div>;

    const formatCount = (count: number) => {
        return isFormat ? (count / 1e9).toFixed(6) + ' MON' : count;
    };

    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 12);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-base font-semibold">{title}</h3>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center text-xs">
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Less</span>
                        <div className="flex mx-1">
                            {['tx-scale-0', 'tx-scale-1', 'tx-scale-2', 'tx-scale-3', 'tx-scale-4'].map((scale) => (
                                <div key={scale} className={`w-3 h-3 ${scale}`} />
                            ))}
                        </div>
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">More</span>
                    </div>
                </div>
            </div>
            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                <CalendarHeatmap
                    startDate={startDate}
                    endDate={endDate}
                    values={data}
                    classForValue={(value) => {
                        if (!value) return 'color-empty';
                        if (value.count > 30) return 'tx-scale-4';
                        if (value.count > 20) return 'tx-scale-3';
                        if (value.count > 10) return 'tx-scale-2';
                        if (value.count > 5) return 'tx-scale-1';
                        return 'tx-scale-0';
                    }}
                    showWeekdayLabels={true}
                    titleForValue={(value) => value 
                        ? `${value.date} - ${tips}: ${formatCount(value.count)}` 
                        : 'No data'}
                />
            </div>
        </div>
    );
};

export default DataHeatmap;
