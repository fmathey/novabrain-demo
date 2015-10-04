'use strict';

var Scene = require('./scene.js');

class Engine {

    constructor(selector) {

        this.canvas        = document.querySelector(selector);
        this.canvas.width  = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context       = this.canvas.getContext('2d');
        this.scene         = null;

        window.onresize = (e) => {
            this.canvas.width  = window.innerWidth;
            this.canvas.height = window.innerHeight;
        };
    }

    run(scene) {

        if (!(scene instanceof Scene)) {
            throw new Error('Scene instance expected');
        }

        var startTime = (new Date()).getTime();

        var feed = () => {
            setTimeout(() => {
                scene.feed();
                feed();
            }, 2000 + Math.random() * 5000);
        };

        var fitness = () => {
            setTimeout(() => {
                scene.fitness();
                fitness();
            }, 20000);
        };

        var update = () => {
            setTimeout(() => {
                scene.update((new Date()).getTime() - startTime);
                update();
            }, 1000 / 100);
        };

        var draw = () => {
            setTimeout(() => {
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                scene.draw((new Date()).getTime() - startTime);
                draw();
            }, 1000 / 100);
        };

        feed();
        fitness();
        update();
        draw();
    }
}

module.exports = Engine;
