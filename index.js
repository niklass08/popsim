import population from './class/population.js';
import config from './config/config.js';

const france = new population(config.populationSize);
france.init();
france.createOneRandomSick();
var ctx = document.getElementById('chart').getContext('2d');
let sickData = [0];
let deathData = [0];
let healData = [0];
let count = 0;
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [1],
    datasets: [
      {
        label: '# of sick',
        data: sickData,
        borderWidth: 1,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '# of death',
        data: deathData,
        borderWidth: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      {
        label: '# of healed',
        data: healData,
        borderWidth: 1,
        backgroundColor: 'rgba(132, 99, 255, 0.5)',
      }
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    animation: {
      duration: 0, // general animation time
    },
    hover: {
      animationDuration: 0, // duration of animations when hovering an item
    },
    responsiveAnimationDuration: 0, // animation duration after a resize
  },
});
function draw() {
  const canvas = document.getElementById('canvas');
  canvas.width = config.canvasWidth;
  canvas.height = config.canvasHeight;
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, 1000, 1000); // effacer le canvas
  context.fillStyle = 'green';
  france._population.forEach((french) => {
    const x = (french.x / config.internalWidth) * config.canvasWidth;
    const y = (french.y / config.internalHeight) * config.canvasHeight;
    if (french.isSick) {
      context.fillStyle = 'red';
    }
    if (french.isDead) {
      context.fillStyle = 'black';
    }
    if (french.isHealed) {
      context.fillStyle = 'blue';
    }
    context.fillRect(x, y, 10, 10);
    context.fillStyle = 'green';
  });
  france.move();
  let deathData = france.updateDeath();
  let healData = france.updateHeal();
  let sickData = france.propagate(config.propagationRate);

  myChart.data.labels.push(
    myChart.data.labels[myChart.data.labels.length - 1] + 1
  );
  myChart.data.datasets[0].data = sickData.slice();
  myChart.data.datasets[1].data = deathData.slice();
  myChart.data.datasets[2].data = healData.slice();
  if (count % 50 === 0) {
    myChart.update();
  }
  count++;
  window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);
