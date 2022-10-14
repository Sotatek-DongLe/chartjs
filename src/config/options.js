import React from 'react';
import { createRoot } from 'react-dom/client';
import TooltipComponent from '../components/TooltipComponent';

export const options = {
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
        console.log(this);
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
          const titleLines = tooltipModel.title || [];
          titleLines.forEach((line, index) => {
            titleLines[index] = new Date(line).toLocaleDateString();
          });
          const bodyLines = tooltipModel.body.map((bodyItem) => bodyItem.lines);
          createRoot(tooltipEl).render(
            <TooltipComponent titleLines={titleLines} bodyLines={bodyLines} />
          );
        }

        // Display, position, and set styles for font
        tooltipEl.getBoundingClientRect();
        console.log(tooltipEl.getBoundingClientRect());
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.left = '0';
        tooltipEl.style.top = '0';
      },
    },
  },
};
