import population from './class/population.js';

const france = new population(5);
france.init();
france.createOneRandomSick();

function draw(){
    var ctx = document.getElementById('canvas').getContext('2d');
    ctx.clearRect(0,0,300,300); // effacer le canvas
    ctx.fillStyle = 'green';
    france._population.forEach(french => {
        const x = french.x;
        const y = french.y;
        if(french.isSick){
            ctx.fillStyle = 'red';
        }
        ctx.fillRect(x, y, 10, 10);
        ctx.fillStyle = 'green'
    });
    france.move();
    france.propagate(1);
    window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);
