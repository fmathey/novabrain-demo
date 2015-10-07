'use strict';

var Stage = require('./stage');
var Vector = require('./vector');

class Entity {
    constructor(stage, position) {

        if (!(stage instanceof Stage)) {
            throw new Error('Stage instance expected');
        }

        if (!(position instanceof Vector)) {
            throw new Error('Vector instance expected');
        }

        this.stage = stage;
        this.position = position;
    }

    update(time) {}

    draw(time) {}
}

module.exports = Entity;