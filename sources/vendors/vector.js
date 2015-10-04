'use strict';

class Vector {

    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    apply(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    applyForce(force) {
        if (this.x < 0) {
            this.x += force;
        } else if (this.x > 0) {
            this.x -= force;
        }
        if (this.y < 0) {
            this.y += force;
        } else if (this.y > 0) {
            this.y -= force;
        }
        return this;
    }

    limit(vector) {
        if (this.x > vector.x) {
            this.x = vector.x;
        }
        if (this.y > vector.y) {
            this.y = vector.y;
        }
        return this;
    }

    getDistance(vector) {
        var a = this.x - vector.x;
        var b = this.y - vector.y;
        return Math.sqrt(a * a + b * b);
    }

    clone() {
        return new Vector(this.x, this.y);
    }

}

module.exports = Vector;