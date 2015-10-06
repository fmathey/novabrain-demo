'use strict';

var Area    = require('./area');
var Vector  = require('./vector');

class Scene {

    constructor(engine) {
        this.engine = engine;
    }

    update(time) {}

    draw(time) {}

    getContext() {
        return this.engine.context;
    }

    getWidth() {
        return this.engine.canvas.width;
    }

    getHeight() {
        return this.engine.canvas.height;
    }

    getSize() {
        return new Vector(
            this.getWidth(),
            this.getHeight()
        );
    }

    getArea(offset) {
        offset = offset || 0;
        return new Area(0, 0, this.getWidth(), this.getHeight(), offset);
    }

    getCenter() {
        return new Vector(
            this.getWidth() / 2,
            this.getHeight() / 2
        );
    }

    getRandomPosition(area) {
        area = area || this.getArea(50);
        return new Vector(
            area.x1 + Math.random() * area.x2,
            area.y1 + Math.random() * area.y2
        );
    }
}

module.exports = Scene;