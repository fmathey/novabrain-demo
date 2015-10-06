'use strict';

class Color {

    constructor(r, g, b, a) {
        this.r = r || 0;
        this.g = g || 0;
        this.b = b || 0;
        this.a = a || 1;
    }

    clone() {
        return new Color(this.r, this.g, this.b, this.a);
    }

    setRedChannel(value) {
        this.r = value;
        return this;
    }

    setGreenChannel(value) {
        this.g = value;
        return this;
    }

    setBlueChannel(value) {
        this.b = value;
        return this;
    }

    setAlphaChannel(value) {
        this.a = value;
        return this;
    }

    toString() {
        return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.a + ')';
    }
}

Color.black = function() { return new Color(  0,   0,   0); };
Color.white = function() { return new Color(255, 255, 255); };
Color.red   = function() { return new Color(255,   0,   0); };
Color.green = function() { return new Color(  0, 255,   0); };
Color.blue  = function() { return new Color(  0,   0, 255); };
Color.grey  = function() { return new Color(100, 100, 100); };

//'rgba(69, 178, 157, 0.5)'

module.exports = Color;