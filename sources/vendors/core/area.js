'use strict';

var Vector = require('./vector');

class Area {

    constructor(x1, y1, x2, y2, offset) {

        offset = offset || 0;


        this.x1 = x1 || 0;
        this.y1 = y1 || 0;
        this.x2 = x2 || 0;
        this.y2 = y2 || 0;

        if (!(x2 - x1 > offset * 2 && y2 - y1 > offset * 2)) {
            throw new Error('Offset too large');
        }

        this.x1 += offset;
        this.y1 += offset;
        this.x2 -= offset;
        this.y2 -= offset;
    }

    clone() {
        return new Area(this.x1, this.y1, this.x2, this.y2);
    }

    contains(vector) {
        if (vector.x < this.x1) return false;
        if (vector.y < this.y1) return false;
        if (vector.x > this.x2) return false;
        if (vector.y > this.y2) return false;
        return true;
    }

    constrain(vector, offset) {
        offset = offset || 0;
        if (vector.x < this.x1 + offset) vector.x = this.x1 + offset;
        if (vector.y < this.y1 + offset) vector.y = this.y1 + offset;
        if (vector.x > this.x2 - offset) vector.x = this.x2 - offset;
        if (vector.y > this.y2 - offset) vector.y = this.y2 - offset;
        return this;
    }

    getSize() {
        return new Vector(this.x2 - this.x1, this.y2 - this.y1);
    }
}

module.exports = Area;