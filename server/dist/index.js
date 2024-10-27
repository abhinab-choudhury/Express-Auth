"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const app = (0, express_1.default)();
app.use("/auth", auth_routes_1.default);
app.get("/health", (_req, res) => {
    res.status(200).json({
        message: "Server is Healthy",
        data: {},
        errors: {},
        success: true,
        status: 200,
    });
});
// Home Route
app.get("/", (_req, res) => {
    res.send("<h1>Express Typescript on Vercel</h1>");
});
app.listen(8080, () => {
    console.log(`Server running on PORT:${8080}`);
});
// Global Catch
app.use((err, _req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});
