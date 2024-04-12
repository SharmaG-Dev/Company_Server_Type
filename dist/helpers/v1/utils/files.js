"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genUniqueNames = void 0;
function genUniqueNames(len) {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var characterLength = characters.length;
    var result = '';
    for (var i = 0; i < len; i++) {
        result += characters.charAt(Math.floor(Math.random() * characterLength));
    }
    return result;
}
exports.genUniqueNames = genUniqueNames;
