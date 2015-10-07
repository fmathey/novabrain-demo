'use strict';

var Core = require('./core');

class Entity extends Core.Entity {
    constructor(stage, position, family, color) {

        super(stage, position);

        this.family         = family || 0;
        this.size           = 10;
        this.move           = new Core.Vector();
        this.velocity       = 0.01 + Math.random() * 0.005;
        this.color          = color || Core.Color.grey();
        this.lifeTime       = 10000 + Math.random() * 60000;
        this.moveTimeout    = new Core.Timeout(100, 800);
        this.fitnessTimeout = new Core.Timeout(10000, 13000);
    }

    find() {
        var target = null;

        for (var i in this.stage.foods) {
            var food = this.stage.foods[i];
            var position = this.position;
            if (!target || position.getDistance(food.position) <= position.getDistance(target)) {
                target = food.position;
            }
        }

        target = target || this.stage.getRandomPosition();

        return target;
    }

    target(position) {
        var dx = position.x - this.position.x;
        var dy = position.y - this.position.y;
        var angle = Math.atan2(dy, dx);
        var value = 1 + Math.random() * 0.5;
        return new Core.Vector(
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

        this.move.applyForce(this.stage.friction);
        this.move.applyForce(this.velocity);
        this.position.apply(this.move);

        this.stage.getArea().constrain(this.position, this.size + 1);

        for (var i in this.stage.foods) {
            var food = this.stage.foods[i];
            if (this.position.getDistance(food.position) <= this.size + 2) {
                var increment = Math.round(food.size / 3);
                this.stage.foods.splice(i, 1);
                this.size += increment;
                this.stage.stats.increment('family' + this.family + '.foods', increment);
                this.lifeTime += increment * 5000;
            }
        }

        return this;
    }

    draw(time) {

        var ctx = this.stage.getContext();

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
}

module.exports = Entity;