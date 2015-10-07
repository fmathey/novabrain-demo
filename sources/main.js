var Core   = require('./vendors/core');
var Stage  = require('./vendors/stage');

var engine = new Core.Engine('#Demo-canvas');
var stage  = new Stage(engine);

engine.load(stage).run();

