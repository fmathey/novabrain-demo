var Vector = function (x, y) {

    var me = {};

    me.x = x || 0;
    me.y = y || 0;

    me.apply = function (point) {
        me.x += point.x;
        me.y += point.y;
    };

    me.applyForce = function (force) {
        if (me.x < 0) {
            me.x += force;
        } else if (me.x > 0) {
            me.x -= force;
        }
        if (me.y < 0) {
            me.y += force;
        } else if (me.y > 0) {
            me.y -= force;
        }

        return this;
    };

    me.getDistance = function(vector) {
        var a = me.x - vector.x;
        var b = me.y - vector.y;
        return Math.sqrt(a * a + b * b);
    };

    me.clone = function () {
        return new Vector(me.x, me.y);
    };

    return me;
};