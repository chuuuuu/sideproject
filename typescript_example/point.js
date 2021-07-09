"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
class Point {
    // only write private when they need to
    constructor(_x, _y, sayhi) {
        this._x = _x;
        this._y = _y;
        if (sayhi) {
            console.log("hi");
        }
    }
    // you can add public as prefix, however, it is redundent
    draw() {
        console.log(`x: ${this._x}, y: ${this._y}`);
    }
    get_distance(another) {
        const dx = another._x - this._x;
        const dy = another._y - this._y;
        const dis = Math.pow(dx, 2) + Math.pow(dy, 2);
        console.log(`the distance is ${dis}`);
    }
    get x() {
        return this._x;
    }
    set x(x) {
        this._x = x;
    }
    get y() {
        return this._y;
    }
    set y(y) {
        this._y = y;
    }
}
exports.Point = Point;
