'use strict';

var Core    = require('./core');
var Entity  = require('./entity');
var Food    = require('./food');

class Scene extends Core.Scene {

    constructor(engine) {
        super(engine);

        this.friction    = 0.01;
        this.entities    = [];
        this.foods       = [];
        this.stats       = new Core.Stats();
        this.feedTimeout = new Core.Timeout(500, 1000);

        this.stats.set('entities.count');
        this.stats.set('family0.count');
        this.stats.set('family0.foods');
        this.stats.set('family1.count');
        this.stats.set('family1.foods');
    }

    update(time) {

        if (this.entities.length) {
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
                    this.feedTimeout = new Core.Timeout(
                        500 + 20000 / this.entities.length,
                        1000 + 10000 / this.entities.length
                    );
                }
            }
        }
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
}

module.exports = Scene;