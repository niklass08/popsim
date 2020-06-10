import population from './class/population.js';
import config from './config/config.js';

const france = new population(config.populationSize);
france.init();
france.createOneRandomSick();

function draw() {
    const canvas = document.getElementById('canvas');
    canvas.width = config.canvasWidth;
    canvas.height = config.canvasHeight;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, 1000, 1000); // effacer le canvas
    context.fillStyle = 'green';
    france._population.forEach(french => {
        const x = (french.x / config.internalWidth) * config.canvasWidth;;
        const y = (french.y / config.internalHeight) * config.canvasHeight;;
        if (french.isSick) {
            context.fillStyle = 'red';
        }
        context.fillRect(x, y, 10, 10);
        context.fillStyle = 'green'
    });
    france.move();
    france.propagate(config.propagationRate);
    window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);
