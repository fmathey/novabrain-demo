/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Engine = __webpack_require__(1);
	var Scene = __webpack_require__(2);
	var Vector = __webpack_require__(3);
	var Area = __webpack_require__(6);
	var Color = __webpack_require__(7);
	
	var engine = new Engine('#Demo-canvas');
	var scene = new Scene(engine);
	var area1 = new Area(0, 0, scene.getWidth(), scene.getHeight() / 4, 50);
	var area2 = new Area(0, scene.getHeight() - scene.getHeight() / 4, scene.getWidth(), scene.getHeight(), 50);
	
	console.log(area2);
	
	scene.populate(15, area1, 0, Color.blue());
	scene.populate(15, area2, 1, Color.red());
	
	//scene.feed(2);
	
	engine.run(scene);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var Scene = __webpack_require__(2);
	
	var Engine = (function () {
	    function Engine(selector) {
	        var _this = this;
	
	        _classCallCheck(this, Engine);
	
	        this.canvas = document.querySelector(selector);
	        this.canvas.width = window.innerWidth;
	        this.canvas.height = window.innerHeight;
	        this.context = this.canvas.getContext('2d');
	        this.scene = null;
	
	        window.onresize = function (e) {
	            _this.canvas.width = window.innerWidth;
	            _this.canvas.height = window.innerHeight;
	        };
	    }
	
	    _createClass(Engine, [{
	        key: 'run',
	        value: function run(scene) {
	            var _this2 = this;
	
	            if (!(scene instanceof Scene)) {
	                throw new Error('Scene instance expected');
	            }
	
	            var startTime = new Date().getTime();
	
	            var feed = function feed() {
	                setTimeout(function () {
	                    scene.feed();
	                    feed();
	                }, 2000 + Math.random() * 5000);
	            };
	
	            var fitness = function fitness() {
	                setTimeout(function () {
	                    scene.fitness();
	                    fitness();
	                }, 20000);
	            };
	
	            var update = function update() {
	                setTimeout(function () {
	                    scene.update(new Date().getTime() - startTime);
	                    update();
	                }, 1000 / 100);
	            };
	
	            var draw = function draw() {
	                setTimeout(function () {
	                    _this2.context.clearRect(0, 0, _this2.canvas.width, _this2.canvas.height);
	                    scene.draw(new Date().getTime() - startTime);
	                    draw();
	                }, 1000 / 100);
	            };
	
	            feed();
	            fitness();
	            update();
	            draw();
	        }
	    }]);
	
	    return Engine;
	})();
	
	module.exports = Engine;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var Vector = __webpack_require__(3);
	var Area = __webpack_require__(6);
	var Entity = __webpack_require__(4);
	var Food = __webpack_require__(5);
	
	var Scene = (function () {
	    function Scene(engine) {
	        _classCallCheck(this, Scene);
	
	        this.engine = engine;
	        this.friction = 0.01;
	        this.entities = [];
	        this.foods = [];
	
	        this.stats = {};
	
	        this.setStat('entities.count');
	        this.setStat('family0.count');
	        this.setStat('family0.foods');
	        this.setStat('family1.count');
	        this.setStat('family1.foods');
	    }
	
	    _createClass(Scene, [{
	        key: 'setStat',
	        value: function setStat(key, value) {
	            this.stats[key] = value || 0;
	            return this;
	        }
	    }, {
	        key: 'addStat',
	        value: function addStat(key, value) {
	            this.setStat(key, this.getStat(key) + (value || 0));
	            return this;
	        }
	    }, {
	        key: 'getStat',
	        value: function getStat(key) {
	            return this.stats[key] ? this.stats[key] : 0;
	        }
	    }, {
	        key: 'update',
	        value: function update(time) {
	
	            for (var i in this.entities) {
	                this.entities[i].update(time);
	            }
	            return this;
	        }
	    }, {
	        key: 'draw',
	        value: function draw(time) {
	
	            for (var i in this.foods) {
	                this.foods[i].draw(time);
	            }
	            for (var i in this.entities) {
	                this.entities[i].draw(time);
	            }
	
	            var ctx = this.getContext();
	
	            ctx.save();
	
	            ctx.font = "12px Arial";
	
	            i = 0;
	            for (var key in this.stats) {
	                ctx.fillText(key + ': ' + this.getStat(key), 20, 30 + 20 * i);
	                i++;
	            }
	
	            ctx.restore();
	
	            return this;
	        }
	    }, {
	        key: 'populate',
	        value: function populate(count, area, family, color) {
	            count = count || 1;
	
	            this.addStat('entities.count', count);
	            this.addStat('family' + family + '.count', count);
	
	            for (var i = 0; i < count; i++) {
	                this.entities.push(new Entity(this, this.getRandomPosition(area), family, color));
	            }
	            return this;
	        }
	    }, {
	        key: 'feed',
	        value: function feed(count, area) {
	            count = count || 1;
	            for (var i = 0; i < count; i++) {
	                this.foods.push(new Food(this, this.getRandomPosition(area)));
	            }
	            return this;
	        }
	    }, {
	        key: 'fitness',
	        value: function fitness(value) {
	            value = value || 1;
	            for (var i in this.entities) {
	                this.entities[i].size -= value;
	                if (this.entities[i].size < 5) {
	                    this.addStat('family' + this.entities[i].family + '.count', -1);
	                    this.entities.splice(i, 1);
	                    this.setStat('entities.count', this.entities.length);
	                }
	            }
	            return this;
	        }
	    }, {
	        key: 'getContext',
	        value: function getContext() {
	            return this.engine.context;
	        }
	    }, {
	        key: 'getWidth',
	        value: function getWidth() {
	            return this.engine.canvas.width;
	        }
	    }, {
	        key: 'getHeight',
	        value: function getHeight() {
	            return this.engine.canvas.height;
	        }
	    }, {
	        key: 'getSize',
	        value: function getSize() {
	            return new Vector(this.getWidth(), this.getHeight());
	        }
	    }, {
	        key: 'getArea',
	        value: function getArea(offset) {
	            offset = offset || 0;
	            return new Area(0, 0, this.getWidth(), this.getHeight(), offset);
	        }
	    }, {
	        key: 'getCenter',
	        value: function getCenter() {
	            return new Vector(this.getWidth() / 2, this.getHeight() / 2);
	        }
	    }, {
	        key: 'getRandomPosition',
	        value: function getRandomPosition(area) {
	            area = area || this.getArea(50);
	            return new Vector(area.x1 + Math.random() * area.x2, area.y1 + Math.random() * area.y2);
	        }
	    }]);
	
	    return Scene;
	})();
	
	module.exports = Scene;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var Vector = (function () {
	    function Vector(x, y) {
	        _classCallCheck(this, Vector);
	
	        this.x = x || 0;
	        this.y = y || 0;
	    }
	
	    _createClass(Vector, [{
	        key: 'apply',
	        value: function apply(vector) {
	            this.x += vector.x;
	            this.y += vector.y;
	            return this;
	        }
	    }, {
	        key: 'applyForce',
	        value: function applyForce(force) {
	            if (this.x < 0) {
	                this.x += force;
	            } else if (this.x > 0) {
	                this.x -= force;
	            }
	            if (this.y < 0) {
	                this.y += force;
	            } else if (this.y > 0) {
	                this.y -= force;
	            }
	            return this;
	        }
	    }, {
	        key: 'limit',
	        value: function limit(vector) {
	            if (this.x > vector.x) {
	                this.x = vector.x;
	            }
	            if (this.y > vector.y) {
	                this.y = vector.y;
	            }
	            return this;
	        }
	    }, {
	        key: 'getDistance',
	        value: function getDistance(vector) {
	            var a = this.x - vector.x;
	            var b = this.y - vector.y;
	            return Math.sqrt(a * a + b * b);
	        }
	    }, {
	        key: 'clone',
	        value: function clone() {
	            return new Vector(this.x, this.y);
	        }
	    }]);
	
	    return Vector;
	})();
	
	module.exports = Vector;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var Vector = __webpack_require__(3);
	var Color = __webpack_require__(7);
	
	var Entity = (function () {
	    function Entity(scene, position, family, color) {
	        _classCallCheck(this, Entity);
	
	        if (!(position instanceof Vector)) {
	            throw new Error('Vector instance expected');
	        }
	
	        this.scene = scene;
	        this.position = position;
	        this.family = family || 0;
	        this.size = 10;
	        this.move = new Vector();
	        this.velocity = 0.01 + Math.random() * 0.005;
	        this.color = color || Color.grey();
	
	        this.lastActionTime = 0;
	        this.timeToNextAction = Math.random() * 800 + 50;
	    }
	
	    _createClass(Entity, [{
	        key: 'find',
	        value: function find() {
	            var target = null;
	
	            for (var i in this.scene.foods) {
	                var food = this.scene.foods[i];
	                var position = this.position;
	                if (!target || position.getDistance(food.position) <= position.getDistance(target)) {
	                    target = food.position;
	                }
	            }
	
	            target = target || this.scene.getRandomPosition();
	
	            return target;
	        }
	    }, {
	        key: 'target',
	        value: function target(position) {
	            var dx = position.x - this.position.x;
	            var dy = position.y - this.position.y;
	            var angle = Math.atan2(dy, dx);
	            var value = 1 + Math.random() * 0.5;
	            return new Vector(Math.cos(angle) * value, Math.sin(angle) * value);
	        }
	    }, {
	        key: 'update',
	        value: function update(time) {
	
	            if (time - this.lastActionTime > this.timeToNextAction) {
	                this.move.apply(this.target(this.find()));
	                this.lastActionTime = time;
	                this.timeToNextAction = Math.random() * 800 + 50;
	            }
	
	            this.move.applyForce(this.scene.friction);
	            this.move.applyForce(this.velocity);
	            this.position.apply(this.move);
	
	            this.scene.getArea().constrain(this.position, this.size + 1);
	
	            for (var i in this.scene.foods) {
	                var food = this.scene.foods[i];
	                if (this.position.getDistance(food.position) <= this.size + 2) {
	                    var increment = Math.round(food.size / 3);
	                    this.scene.foods.splice(i, 1);
	                    this.size += increment;
	                    this.scene.addStat('family' + this.family + '.foods', increment);
	                }
	            }
	
	            return this;
	        }
	    }, {
	        key: 'draw',
	        value: function draw(time) {
	
	            var ctx = this.scene.getContext();
	
	            ctx.save();
	
	            ctx.translate(this.position.x, this.position.y);
	            ctx.beginPath();
	            ctx.arc(0, 0, this.size, 0, 2 * Math.PI, false);
	            ctx.fillStyle = this.color.clone().setAlphaChannel(0.1).toString();
	            ctx.fill();
	            ctx.strokeStyle = this.color.toString();
	            ctx.stroke();
	            ctx.closePath();
	
	            ctx.beginPath();
	            ctx.moveTo(0, 0);
	            ctx.lineTo(this.move.x * 10 * -1, this.move.y * 10 * -1);
	            ctx.strokeStyle = this.color.toString();
	            ctx.stroke();
	            ctx.closePath();
	
	            ctx.restore();
	
	            //ctx.fillStyle = '#000000';
	            //ctx.fillText(this.stats.eatenFoods, this.size + 5, 0);
	
	            return this;
	        }
	    }]);
	
	    return Entity;
	})();
	
	module.exports = Entity;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var Color = __webpack_require__(7);
	
	var Food = (function () {
	    function Food(scene, position) {
	        _classCallCheck(this, Food);
	
	        this.scene = scene;
	        this.position = position;
	        this.size = Math.round(3 + Math.random() * 7);
	    }
	
	    _createClass(Food, [{
	        key: 'draw',
	        value: function draw() {
	            var ctx = this.scene.getContext();
	            ctx.save();
	            ctx.translate(this.position.x, this.position.y);
	            ctx.beginPath();
	            ctx.arc(0, 0, this.size, 0, 2 * Math.PI, false);
	            ctx.fillStyle = Color.green().toString();
	            ctx.fill();
	            ctx.closePath();
	            ctx.restore();
	            return this;
	        }
	    }]);
	
	    return Food;
	})();
	
	module.exports = Food;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var Vector = __webpack_require__(3);
	
	var Area = (function () {
	    function Area(x1, y1, x2, y2, offset) {
	        _classCallCheck(this, Area);
	
	        offset = offset || 0;
	
	        this.x1 = x1 || 0;
	        this.y1 = y1 || 0;
	        this.x2 = x2 || 0;
	        this.y2 = y2 || 0;
	
	        if (!(x2 - x1 > offset * 2 && y2 - y1 > offset * 2)) {
	            throw new Error('Offset too large');
	        }
	
	        this.x1 += offset;
	        this.y1 += offset;
	        this.x2 -= offset;
	        this.y2 -= offset;
	    }
	
	    _createClass(Area, [{
	        key: 'clone',
	        value: function clone() {
	            return new Area(this.x1, this.y1, this.x2, this.y2);
	        }
	    }, {
	        key: 'contains',
	        value: function contains(vector) {
	            if (vector.x < this.x1) return false;
	            if (vector.y < this.y1) return false;
	            if (vector.x > this.x2) return false;
	            if (vector.y > this.y2) return false;
	            return true;
	        }
	    }, {
	        key: 'constrain',
	        value: function constrain(vector, offset) {
	            offset = offset || 0;
	            if (vector.x < this.x1 + offset) vector.x = this.x1 + offset;
	            if (vector.y < this.y1 + offset) vector.y = this.y1 + offset;
	            if (vector.x > this.x2 - offset) vector.x = this.x2 - offset;
	            if (vector.y > this.y2 - offset) vector.y = this.y2 - offset;
	            return this;
	        }
	    }, {
	        key: 'getSize',
	        value: function getSize() {
	            return new Vector(this.x2 - this.x1, this.y2 - this.y1);
	        }
	    }]);
	
	    return Area;
	})();
	
	module.exports = Area;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var Color = (function () {
	    function Color(r, g, b, a) {
	        _classCallCheck(this, Color);
	
	        this.r = r || 0;
	        this.g = g || 0;
	        this.b = b || 0;
	        this.a = a || 1;
	    }
	
	    _createClass(Color, [{
	        key: 'clone',
	        value: function clone() {
	            return new Color(this.r, this.g, this.b, this.a);
	        }
	    }, {
	        key: 'setRedChannel',
	        value: function setRedChannel(value) {
	            this.r = value;
	            return this;
	        }
	    }, {
	        key: 'setGreenChannel',
	        value: function setGreenChannel(value) {
	            this.g = value;
	            return this;
	        }
	    }, {
	        key: 'setBlueChannel',
	        value: function setBlueChannel(value) {
	            this.b = value;
	            return this;
	        }
	    }, {
	        key: 'setAlphaChannel',
	        value: function setAlphaChannel(value) {
	            this.a = value;
	            return this;
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.a + ')';
	        }
	    }]);
	
	    return Color;
	})();
	
	Color.red = function () {
	    return new Color(255, 0, 0);
	};
	Color.green = function () {
	    return new Color(0, 255, 0);
	};
	Color.blue = function () {
	    return new Color(0, 0, 255);
	};
	Color.grey = function () {
	    return new Color(100, 100, 100);
	};
	
	//'rgba(69, 178, 157, 0.5)'
	
	module.exports = Color;

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map