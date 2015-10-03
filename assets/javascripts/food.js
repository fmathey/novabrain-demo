var Food = function (world, position) {

    var ctx = world.context;

    var me = {};

    me.position = position.clone();

    me.draw = function () {

        ctx.save();

        ctx.translate(me.position.x, me.position.y);

        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#00FF00';
        ctx.fill();
        ctx.closePath();

        ctx.restore();
    };

    return me;

};