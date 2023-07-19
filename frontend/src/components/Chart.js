// src/components/Chart.js
import React, { useState, useEffect } from 'react';
import { fetchData } from '../utils/api';
import { Bar } from 'react-chartjs-2';

const Chart = ({ country, indicator, startDate, endDate }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (country && indicator && startDate && endDate) {
      fetchData(country, indicator, startDate, endDate)
        .then(data => {
          const chartLabels = data.map(item => item.date);
          const chartValues = data.map(item => item.value);
          setChartData({
            labels: chartLabels,
            datasets: [
              {
                label: indicator,
                data: chartValues,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          });
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setChartData({});
        });
    } else {
      setChartData({});
    }
  }, [country, indicator, startDate, endDate]);

  return (
    <div>
      <Bar data={chartData} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default Chart;
