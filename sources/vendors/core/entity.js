'use strict';

var Scene = require('./scene');
var Vector = require('./vector');

class Entity {
    constructor(scene, position) {

        if (!(scene instanceof Scene)) {
            throw new Error('Scene instance expected');
        }

        if (!(position instanceof Vector)) {
            throw new Error('Vector instance expected');
        }

        this.scene = scene;
        this.position = position;
    }

    update(time) {}

    draw(time) {}
}

module.exports = Entity;