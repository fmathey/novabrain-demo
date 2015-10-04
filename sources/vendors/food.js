'use strict';

var Color = require('./color.js');

class Food {
    constructor(scene, position) {
        this.scene = scene;
        this.position = position;
        this.size = Math.round(3 + Math.random() * 7);
    }

    draw() {
        var ctx = this.scene.getContext();
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, 2 * Math.PI, false);
        ctx.fillStyle = Color.green().toString() ;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
        return this;
    }
}

module.exports = Food;