import React from 'react';
import { createRoot } from 'react-dom/client';
import * as ReactDOM from 'react-dom';
import TooltipComponent from '../components/TooltipComponent';

export const options = {
  interaction: {
    intersect: false,
    mode: 'index',
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        callback: function (value) {
          let labelValue = this.getLabelForValue(value);
          return new Date(labelValue).getDate();
        },
      },
    },
    y: {
      position: 'right',
      grid: {
        display: false,
      },
      ticks: {
        // Include a dollar sign in the ticks
        callback: function (value) {
          return (
            '$' +
            String(value).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')
          );
        },
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,

      external: function (context) {
        let tooltipEl = document.querySelector('.chartjs-tooltip');
        const barChartContainer = document.querySelector('.bar-chart');
        // Create element on first render
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.className = 'chartjs-tooltip';
          barChartContainer.appendChild(tooltipEl);
        }
        const tooltipModel = context.tooltip;
        if (tooltipModel.body) {
          const bodyLines = tooltipModel.body.map((bodyItem) => bodyItem.lines);
          const titleLines = tooltipModel.title || [];
          titleLines.forEach((line, index) => {
            if (new Date(line) !== 'Invalid Date' && !isNaN(new Date(line))) {
              titleLines[index] = new Date(line).toLocaleDateString();
            } else {
              titleLines[index] = '';
              bodyLines[index] = '';
            }
          });
          ReactDOM.render(
            <TooltipComponent titleLines={titleLines} bodyLines={bodyLines} />,
            tooltipEl
          );
        }
      },
    },
  },
};
