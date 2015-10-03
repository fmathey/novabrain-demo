var Creature = function (world, position, color) {

    var ctx = world.context;

    var me = {};

    me.position = position.clone();
    me.acceleration = new Vector();
    me.angle = Math.random() * 2 * Math.PI;
    me.color = color;
    me.speed = 0.01 + Math.random() * 0.05;
    me.size = 9;
    me.target = world.center.clone();
    me.stats = {
        foods: 0
    };

    me.getDistance = function(vector) {
        return me.position.getDistance(vector);
    };

    me.animate = function() {
        setTimeout(function() {
            me.target = me.getTargetRandom();

            if (world.foods.length) {

                var bestFoodIndex    = 0;
                var bestFoodDistance = world.foods[bestFoodIndex];

                for (var i = 0; i < world.foods.length; i++) {

                    var distance = me.getDistance(world.foods[i].position);

                    if (distance < bestFoodDistance) {
                        bestFoodIndex = i;
                        bestFoodDistance = distance;
                    }
                }

                me.target = me.getTargetFromVector(
                    world.foods[bestFoodIndex].position.clone()
                );
            }

            me.acceleration.apply(me.target);
            me.animate();
        }, Math.random() * 500 + 50);
    };

    me.getTargetFromVector = function (vector) {
        var dx = vector.x - me.position.x;
        var dy = vector.y - me.position.y;
        var angle = Math.atan2(dy, dx) * 180 / Math.PI;
        var value = 1 + Math.random() * 0.5;
        return new Vector(
            Math.cos(angle) * value,
            Math.sin(angle) * value
        );
    };

    me.getTargetRandom = function () {
        var angle = Math.random() * 2 * Math.PI;
        var value = 1 + Math.random() * 0.5;
        return new Vector(
            Math.cos(angle) * value,
            Math.sin(angle) * value
        );
    };

    me.update = function () {

        me.acceleration.applyForce(world.friction * me.speed);
        me.position.apply(me.acceleration);

        if (me.position.x < me.size) {
            me.position.x = me.size;
        }

        if (me.position.y < me.size) {
            me.position.y = me.size;
        }

        if (me.position.x > world.canvas.width - me.size) {
            me.position.x = world.canvas.width - me.size;
        }

        if (me.position.y > world.canvas.height - me.size) {
            me.position.y = world.canvas.height - me.size;
        }

        if (world.foods.length) {

            for (var i = 0; i < world.foods.length; i++) {
                if (me.getDistance(world.foods[i].position) <= me.size) {
                    world.foods.splice(i, 1);
                    me.size += 1;
                    me.stats.foods++;
                }
            }
        }
    };

    me.draw = function () {

        ctx.save();

        ctx.translate(me.position.x, me.position.y);

        ctx.beginPath();
        ctx.arc(0, 0, me.size, 0, 2 * Math.PI, false);
        ctx.fillStyle = me.color;
        ctx.fill();
        //ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(me.acceleration.x * 10, me.acceleration.y * 10);
        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = '#000000';
        ctx.fillText(me.stats.foods, me.size + 5, 0);
        //ctx.fillText(me.value, me.size + 10, 10);

        ctx.restore();

        me.update();
    };

    me.animate();

    return me;

};