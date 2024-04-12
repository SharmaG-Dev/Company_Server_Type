"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateWithSchema = void 0;
var ValidateWithSchema = function (schema, callback) {
    return function (req, res, next) {
        callback(req, res, next, schema);
    };
};
exports.ValidateWithSchema = ValidateWithSchema;
