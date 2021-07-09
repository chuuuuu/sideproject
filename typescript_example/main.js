"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const point_js_1 = require("./point.js");
const color_js_1 = require("./color.js");
const p1 = new point_js_1.Point(100, 123);
const p2 = new point_js_1.Point(200, 555);
p1.get_distance(p2);
console.log(color_js_1.Color.Blue);
