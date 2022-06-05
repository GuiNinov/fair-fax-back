"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildResponse = void 0;
const buildResponse = (res, content, valid, message, status_code) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(status_code).json({
        content,
        valid,
        message,
        status_code
    });
};
exports.buildResponse = buildResponse;
