import { GasTransaction } from "../types";

export const processHeatmapData = (transactions: GasTransaction[], type: 'gas' | 'count') => {
  const currentDate = new Date();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // 获取月份标签
  const months = Array.from({ length: 12 }, (_, i) => {
    const monthIndex = (currentDate.getMonth() - i + 12) % 12;
    return monthNames[monthIndex];
  }).reverse();

  // 初始化数据矩阵
  const dataMatrix = Array(7).fill(0).map(() => Array(12).fill(0));
  const countMatrix = Array(7).fill(0).map(() => Array(12).fill(0));

  // 处理数据
  transactions.forEach(tx => {
    const date = new Date(tx.block_timestamp);
    const monthIndex = (date.getMonth() - currentDate.getMonth() + 12) % 12;
    const day = date.getDay();
    
    if (monthIndex < 12) {
      if (type === 'gas') {
        dataMatrix[day][monthIndex] += tx.gas_price;
      }
      countMatrix[day][monthIndex] += 1;
    }
  });

  // 计算最终数据
  const finalData = type === 'gas'
    ? dataMatrix.map((row, i) => row.map((sum, j) => 
        countMatrix[i][j] ? sum / countMatrix[i][j] : 0))
    : countMatrix;

  const maxValue = Math.max(...finalData.flat().filter(v => v > 0));

  return { data: finalData, months, days, maxValue };
};
