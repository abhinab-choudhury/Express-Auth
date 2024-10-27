"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/", (req, res) => {
    // passport local strategy
    res.send("Local Strategy");
});
router.post("/google", (req, res) => {
    // google OAuth 2.0 Strategy
    res.send("Google OAuth 2.0 Strategy");
});
router.post("/github", (req, res) => {
    // github OAuth Strategy
    res.send("Github OAuth Strategy");
});
exports.default = router;
