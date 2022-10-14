import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import { FETCH_DATA_BTC_USDT } from '../const';
import { useEffect, useState } from 'react';
import { options } from '../config/options';
import './BarChart.scss';
import { plugins } from '../config/plugin';

export const BarChart = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = () => {
      // const res = await fetch('API');
      // const FETCH_DATA = await res.json();
      const fetchData = {
        labels: FETCH_DATA_BTC_USDT.map((item) => item.date),
        datasets: [
          {
            data: FETCH_DATA_BTC_USDT.map((item) => item.volume),
            backgroundColor: ['#1fc7d4'],
            borderColor: ['#1fc7d4'],
          },
        ],
      };
      setData(fetchData);
    };

    fetchData();
  }, []);

  return (
    <div className="bar-chart">
      {data && <Bar data={data} options={options} plugins={plugins} />}
    </div>
  );
};
