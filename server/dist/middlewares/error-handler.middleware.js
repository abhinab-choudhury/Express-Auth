"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = globalErrorHandler;
const http_errors_1 = require("http-errors");
function globalErrorHandler(err, _req, res, _next) {
    console.log("Error : ", err);
    if ((0, http_errors_1.isHttpError)(err)) {
        res.status(err.status).json({
            message: err.message,
        });
    }
    else {
        res.status(500).json({
            message: "An unknown error has occured",
        });
    }
}
