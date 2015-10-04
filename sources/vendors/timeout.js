'use strict';

class Timeout {
    constructor(minTime, maxTime) {
        this.minTime  = minTime  || 0;
        this.maxTime  = maxTime  || 0;
        this.lastTime = 0;
        this.nextTime = this.minTime + Math.random() * this.maxTime;
    }

    update(time, callback) {
        if (time - this.lastTime > this.nextTime) {
            if (callback) {
                callback();
            }
            this.lastTime = time;
            this.nextTime = this.minTime + Math.random() * this.maxTime;
        }
        return this;
    }
}

module.exports = Timeout;