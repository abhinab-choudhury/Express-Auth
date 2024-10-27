"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const error_handler_middleware_1 = __importDefault(require("./middlewares/error-handler.middleware"));
const http_errors_1 = __importDefault(require("http-errors"));
const cors_1 = __importDefault(require("cors"));
const secrets_1 = require("./utils/secrets");
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const session_1 = __importDefault(require("./config/session"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: secrets_1.FRONTEND_URL,
    credentials: true,
}));
app.use(express_1.default.json({ limit: "16kb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "16kb" }));
if (secrets_1.NODE_ENV === "proproduction") {
    app.set("true proxy", true);
    app.use((0, morgan_1.default)("combined"));
}
else {
    app.use((0, morgan_1.default)("dev"));
}
app.use((0, express_session_1.default)(session_1.default));
// Routes
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/user", user_routes_1.default);
app.get("/health", (_req, res) => {
    res.status(200).json({
        message: "Server is Healthy",
        data: {},
        errors: {},
        success: true,
        status: 200,
    });
});
app.get("/", (_req, res) => {
    res.send("<h1>Express Typescript on Vercel</h1>");
});
app.listen(8080, () => {
    console.log(`⚙️  Server running on PORT:${8080}`);
});
// api route error-handler
app.use((err, req, res, next) => {
    console.log(err);
    next((0, http_errors_1.default)(404, "Endpoint Not Found"));
});
// Global Catch
app.use(error_handler_middleware_1.default);
