'use strict';

var Clock = require('./clock.js');
var Scene = require('./scene.js');

class Engine {

    constructor(selector) {

        this.canvas        = document.querySelector(selector);
        this.canvas.width  = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context       = this.canvas.getContext('2d');
        this.clock         = new Clock();
        this.continue      = true;
        this.fps           = 100;
        this.scene         = null;

        window.onresize = (e) => {
            this.canvas.width  = window.innerWidth;
            this.canvas.height = window.innerHeight;
        };
    }

    load(scene) {
        if (!(scene instanceof Scene)) {
            throw new Error('Scene instance expected');
        }
        this.scene = scene;
        return this;
    }

    run() {

        if (!(this.scene instanceof Scene)) {
            throw new Error('Scene instance expected');
        }

        var process = () => {
            setTimeout(() => {
                var time = this.clock.getTime();
                this.scene.update(time);
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.scene.draw(time);
                if (this.continue) {
                    process();
                }
            }, 1000 / this.fps);
        };

        process();
    }
}

module.exports = Engine;
