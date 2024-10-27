"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const secrets_1 = require("./../utils/secrets");
const PrismaClientSingleton = () => {
    return new client_1.PrismaClient();
};
const prisma = globalThis.prismaGlobal ?? PrismaClientSingleton();
exports.default = prisma;
if (secrets_1.NODE_ENV === "production")
    globalThis.prismaGlobal = prisma;
