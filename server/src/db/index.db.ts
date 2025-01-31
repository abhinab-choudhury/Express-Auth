import { PrismaClient } from "@prisma/client";
import { NODE_ENV } from "./../utils/secrets";

const PrismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof PrismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? PrismaClientSingleton();

export default prisma;

if (NODE_ENV === "production") globalThis.prismaGlobal = prisma;
