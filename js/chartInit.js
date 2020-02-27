import Chart from 'chart.js';

const canvas = document.querySelector('#rates-chart');
const ctx = canvas.getContext('2d');

Chart.defaults.global.elements.line.fill = false;

export default function chartInit() {
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: 11 }, (v, k) => k - 5),
      datasets: [
        {
          label: '',
          data: [],
        },
      ],
    },
    options: {
      tooltips: {
        mode: 'x',
      },
      scales: {
        yAxes: [
          {
            stacked: true,
          },
        ],
      },
    },
  });
}
