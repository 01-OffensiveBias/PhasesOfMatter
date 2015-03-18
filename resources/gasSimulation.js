var dots = new Dots(500, 0, 0, 4, 1);

function render() {
    dots.draw();
    dots.update();
    requestAnimationFrame(render);
}

render();