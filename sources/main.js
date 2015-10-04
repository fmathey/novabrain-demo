var Engine = require('./vendors/engine.js');
var Scene  = require('./vendors/scene.js');
var Area   = require('./vendors/area.js');
var Color  = require('./vendors/color.js');

var engine = new Engine('#Demo-canvas');
var scene  = new Scene(engine);
var area1  = new Area(0, 0, scene.getWidth(), scene.getHeight() / 4, 50);
var area2  = new Area(0, scene.getHeight() - scene.getHeight() / 4, scene.getWidth(), scene.getHeight(), 50);

scene.populate(15, area1, 0, Color.blue());
scene.populate(15, area2, 1, Color.red());

engine.load(scene).run();

