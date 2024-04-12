"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery = exports.validateBody = exports.validateParams = void 0;
var validateParams = function (req, res, next, schema) {
    var error = schema.validate(req.params).error;
    if (error)
        return res.status(400).json({ error: true, message: error.details[0].message });
    next();
};
exports.validateParams = validateParams;
var validateBody = function (req, res, next, schema) {
    var error = schema.validate(req.body).error;
    if (error)
        return res.status(400).json({ error: true, message: error.details[0].message });
    next();
};
exports.validateBody = validateBody;
var validateQuery = function (req, res, next, schema) {
    var error = schema.validate(req.query).error;
    if (error)
        return res.status(400).json({ error: true, message: error.details[0].message });
    next();
};
exports.validateQuery = validateQuery;
