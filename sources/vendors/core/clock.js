'use strict';

class Clock {

    constructor() {
        this.startTime = (new Date()).getTime();
    }

    getTime() {
        return (new Date()).getTime() - this.startTime;
    }
}

module.exports = Clock;