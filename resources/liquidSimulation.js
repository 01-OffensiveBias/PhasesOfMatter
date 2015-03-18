var dots = new Dots(500, 0.5, 0.001, 4, 0.7);

function render() {
    dots.draw();
    dots.update();
    requestAnimationFrame(render);
}

render();