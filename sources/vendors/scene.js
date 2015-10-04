'use strict';

var Vector  = require('./vector.js');
var Area    = require('./area.js');
var Entity  = require('./entity.js');
var Food    = require('./food.js');
var Timeout = require('./timeout.js');

class Scene {

    constructor(engine) {
        this.engine = engine;
        this.friction = 0.01;
        this.entities = [];
        this.foods = [];

        this.stats = {};

        this.feedTimout = new Timeout(2000, 5000);
        this.fitnessTimout = new Timeout(20000);

        this.setStat('entities.count');
        this.setStat('family0.count');
        this.setStat('family0.foods');
        this.setStat('family1.count');
        this.setStat('family1.foods');
    }

    getTime() {
        return this.engine.clock.getTime();
    }

    setStat(key, value) {
        this.stats[key] = value || 0;
        return this;
    }

    addStat(key, value) {
        this.setStat(key, this.getStat(key) + (value || 0));
        return this;
    }

    getStat(key) {
        return this.stats[key] ? this.stats[key] : 0;
    }

    update(time) {

        this.feedTimout.update(time, () => {
            this.feed();
        });

        this.fitnessTimout.update(time, () => {
            this.fitness();
        });

        for (var i in this.entities) {
            this.entities[i].update(time);
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
            ctx.fillText(key + ': ' + this.getStat(key), 20, 30 + 20 * i);
            i++;
        }

        ctx.restore();

        return this;
    }

    populate(count, area, family, color) {
        count = count || 1;

        this.addStat('entities.count', count);
        this.addStat('family' + family + '.count', count);

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

    fitness(value) {
        value = value || 1;
        for (var i in this.entities) {
            this.entities[i].size -= value;
            if (this.entities[i].size < 5) {
                this.addStat('family' + this.entities[i].family + '.count', -1);
                this.entities.splice(i, 1);
                this.setStat('entities.count', this.entities.length);
            }
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