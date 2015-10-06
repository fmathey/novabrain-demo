'use strict';

var Clock = require('./clock');
var Scene = require('./scene');

var requestAnimationFrame = (function() {
    return (
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame
    );
})();

window.requestAnimationFrame = requestAnimationFrame;

class Engine {

    constructor(selector) {

        this.canvas        = document.querySelector(selector);
        this.canvas.width  = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context       = this.canvas.getContext('2d');
        this.clock         = new Clock();
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

        var then = Date.now();

        var process = () => {
            requestAnimationFrame(process);
            var interval = 1000 / this.fps;
            var now = Date.now();
            var delta = now - then;
            if (now > interval) {
                then = now - (delta % interval);
                var time = this.clock.getTime();
                this.scene.update(time);
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.scene.draw(time);
            }
        };

        process();
    }
}

module.exports = Engine;
