var world = new World('#Demo-canvas');

world.populate(30);

window.onclick = function(e) {
    world.addFood(new Vector(e.clientX, e.clientY));
};

setInterval(function() {
    world.addFood();
}, 3000);

world.run();