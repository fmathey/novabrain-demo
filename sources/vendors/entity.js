'use strict';

var Timeout  = require('./timeout.js');
var Vector   = require('./vector.js');
var Color    = require('./color.js');

class Entity {
    constructor(scene, position, family, color) {

        if (!(position instanceof Vector)) {
            throw new Error('Vector instance expected');
        }

        this.id             = scene.entities.length;
        this.scene          = scene;
        this.position       = position;
        this.family         = family || 0;
        this.size           = 10;
        this.move           = new Vector();
        this.velocity       = 0.01 + Math.random() * 0.005;
        this.color          = color || Color.grey();
        this.lifeTime       = 10000 + Math.random() * 60000;
        this.moveTimeout    = new Timeout(50, 800);
        this.fitnessTimeout = new Timeout(10000);
    }

    find() {
        var target = null;

        for (var i in this.scene.foods) {
            var food = this.scene.foods[i];
            var position = this.position;
            if (!target || position.getDistance(food.position) <= position.getDistance(target)) {
                target = food.position;
            }
        }

        target = target || this.scene.getRandomPosition();

        return target;
    }

    target(position) {
        var dx = position.x - this.position.x;
        var dy = position.y - this.position.y;
        var angle = Math.atan2(dy, dx);
        var value = 1 + Math.random() * 0.5;
        return new Vector(
            Math.cos(angle) * value,
            Math.sin(angle) * value
        );
    }

    update(time) {

        this.fitnessTimeout.update(time, () => {
            this.fitness();
        });

        this.moveTimeout.update(time, () => {
            this.move.apply(this.target(this.find()));
        });

        this.move.applyForce(this.scene.friction);
        this.move.applyForce(this.velocity);
        this.position.apply(this.move);

        this.scene.getArea().constrain(this.position, this.size + 1);

        for (var i in this.scene.foods) {
            var food = this.scene.foods[i];
            if (this.position.getDistance(food.position) <= this.size + 2) {
                var increment = Math.round(food.size / 3);
                this.scene.foods.splice(i, 1);
                this.size += increment;
                this.scene.stats.increment('family' + this.family + '.foods', increment);
                this.lifeTime += increment * 5000;
            }
        }

        return this;
    }

    draw(time) {

        var ctx = this.scene.getContext();

        ctx.save();

        ctx.translate(this.position.x, this.position.y);
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color.clone().setAlphaChannel(0.1).toString();
        ctx.fill();
        ctx.strokeStyle = this.color.toString();
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(this.move.x * 10 * -1, this.move.y * 10 * -1);
        ctx.strokeStyle = this.color.toString();
        ctx.stroke();
        ctx.closePath();

        ctx.restore();

        return this;
    }

    fitness(value) {
        value = value || 1;
        this.size -= value;
        this.lifeTime -= 500 + Math.random() * 1000;
        return this;
    }

    kill() {
        this.scene.stats.decrement('family' + this.family + '.count');
        this.scene.entities.splice(this.id, 1);
        this.scene.stats.set('entities.count', this.length);
        return this;
    }
}

module.exports = Entity;