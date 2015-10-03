var World = function(selector) {

    var me = {};

    me.canvas        = document.querySelector(selector);
    me.context       = me.canvas.getContext('2d');
    me.canvas.width  = window.innerWidth;
    me.canvas.height = window.innerHeight;
    me.framerate     = 100;
    me.friction      = 1;
    me.creatures     = [];
    me.center        = new Vector(me.canvas.width/2, me.canvas.height/2);
    me.mouse         = new Vector();
    me.foods         = [];

    me.populate = function(count) {
        for (var i = 0; i < count; i++) {
            world.creatures.push(new Creature(
                me,
                new Vector(
                    me.canvas.width * Math.random(),
                    me.canvas.height * Math.random()
                ),
                '#DF5A49'
            ));
        }
    };

    me.addFood = function(vector) {
        vector = vector || new Vector(
            Math.random() * me.canvas.width,
            Math.random() * me.canvas.height
        );
        me.foods.push(new Food(me, vector));
    };

    me.run = function () {
        me.context.clearRect(0, 0, me.canvas.width, me.canvas.height);

        for (var i in me.foods) {
            me.foods[i].draw();
        }

        for (var i in me.creatures) {
            me.creatures[i].draw();
        }

        setTimeout(me.run, 1000 / me.framerate);
    };

    window.onresize = function(e) {
        me.canvas.width  = window.innerWidth;
        me.canvas.height = window.innerHeight;
    };

    me.addFood();

    return me;
};
