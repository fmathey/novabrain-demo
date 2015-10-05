'use strict';

var Vector  = require('./vector.js');
var Area    = require('./area.js');
var Entity  = require('./entity.js');
var Food    = require('./food.js');
var Timeout = require('./timeout.js');
var Stats   = require('./stats.js');

class Scene {

    constructor(engine) {
        this.engine      = engine;
        this.friction    = 0.01;
        this.entities    = [];
        this.foods       = [];
        this.stats       = new Stats();
        this.feedTimeout = new Timeout(500, 1000);

        this.stats.set('entities.count');
        this.stats.set('family0.count');
        this.stats.set('family0.foods');
        this.stats.set('family1.count');
        this.stats.set('family1.foods');
    }

    update(time) {

        this.feedTimeout.update(time, () => {
            this.feed();
        });

        for (var i in this.entities) {
            if (this.entities[i].lifeTime > time) {
                this.entities[i].update(time);
            } else {
                this.stats.decrement('family' + this.entities[i].family + '.count');
                this.entities.splice(i, 1);
                this.stats.set('entities.count', this.entities.length);
                this.feedTimeout = new Timeout(
                    500 + 20000 / this.entities.length,
                    1000 + 10000 / this.entities.length
                );
            }
        }

        return this;
    }

    draw(time) {

        for (var i in this.foods) {
            this.foods[i].draw(time);
        }

        for (var i in this.entities) {
            this.entities[i].draw(time);
        }

        var ctx = this.getContext();

        ctx.save();

        ctx.font = "12px Arial";

        i = 0;
        for (var key in this.stats) {
            ctx.fillText(key + ': ' + this.stats.get(key), 20, 30 + 20 * i);
            i++;
        }

        ctx.restore();

        return this;
    }

    populate(count, area, family, color) {
        count = count || 1;

        this.stats.increment('entities.count', count);
        this.stats.set('family' + family + '.count', count);

        for (var i = 0; i < count; i++) {
            this.entities.push((new Entity(this, this.getRandomPosition(area), family, color)));
        }
        return this;
    }

    feed(count, area) {
        count = count || 1;
        for (var i = 0; i < count; i++) {
            this.foods.push(new Food(this, this.getRandomPosition(area)));
        }
        return this;
    }

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