'use strict';

class Clock {

    constructor() {
        this.reset();
    }

    reset() {
        this.startTime = Date.now();
        return this;
    }

    getTime() {
        return Date.now() - this.startTime;
    }
}

module.exports = Clock;