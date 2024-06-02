"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryHashtagUnique = void 0;
function QueryHashtagUnique(id) {
    var strWithoutHyphens = id.split('-').join('').toUpperCase();
    return strWithoutHyphens;
}
exports.QueryHashtagUnique = QueryHashtagUnique;
