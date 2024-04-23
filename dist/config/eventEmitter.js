"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var EventTracker = /** @class */ (function () {
    function EventTracker() {
        this.emitter = new events_1.EventEmitter();
    }
    EventTracker.getInstance = function () {
        if (!EventTracker.instance) {
            EventTracker.instance = new EventTracker();
        }
        return EventTracker.instance;
    };
    EventTracker.prototype.on = function (eventName, listener) {
        this.emitter.on(eventName, listener);
    };
    EventTracker.prototype.emit = function (eventName) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        (_a = this.emitter).emit.apply(_a, __spreadArray([eventName], args, false));
    };
    return EventTracker;
}());
exports.default = EventTracker.getInstance();
