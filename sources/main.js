var Core   = require('./vendors/core');
var Engine = Core.Engine;
var Area   = Core.Area;
var Color  = Core.Color;
var Scene  = require('./vendors/scene');

var engine = new Engine('#Demo-canvas');
var scene  = new Scene(engine);
var area1  = new Area(0, 0, scene.getWidth(), scene.getHeight() / 4, 50);
var area2  = new Area(0, scene.getHeight() - scene.getHeight() / 4, scene.getWidth(), scene.getHeight(), 50);

scene.populate(50, area1, 0, Color.black());
scene.populate(50, area2, 1, new Color(223,90,73));

engine.load(scene).run();

