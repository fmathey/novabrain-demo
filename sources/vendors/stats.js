'use strict';

class Stats {

    constructor() {}

    set(key, value) {
        this[key] = value || 0;
        return this;
    }

    get(key, defaultValue) {
        return this.has(key) ? this[key] : defaultValue || 0;
    }

    has(key) {
        return this[key] !== undefined;
    }

    remove(key) {
        delete this[key];
        return this;
    }

    increment(key, value) {
        this[key] = this.get(key) + (value === undefined ? 1 : value);
        return this;
    }

    decrement(key, value) {
        this[key] = this.get(key) - (value === undefined ? 1 : value);
        return this;
    }
}

module.exports = Stats;