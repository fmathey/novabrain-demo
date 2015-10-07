var Core   = require('./vendors/core');
var Scene  = require('./vendors/scene');

var engine = new Core.Engine('#Demo-canvas');
var scene  = new Scene(engine);

engine.load(scene).run();

