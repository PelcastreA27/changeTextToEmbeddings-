import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

// ------------------ Configuración PostgreSQL / TypeORM ------------------
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.HOST_BD,
    port: parseInt(process.env.PORT_BD),
    username: process.env.USERNAME_BD,
    password: process.env.PASSWORD_BD,
    database: process.env.DATABASE_BD,
    synchronize: false,
    logging: false,
    entities: getEntitiesPath(),
    migrations: getMigrationsPath(),
    subscribers: getSubscribersPath(),
    migrationsRun: true,
    ssl: process.env.NODE_ENV === "production" ? true : false,
    extra: process.env.NODE_ENV === "production" ? {
        ssl: {
            rejectUnauthorized: false
        }
    } : null,
});

// ------------------ Configuración OpenAI ------------------
export const openaiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// ------------------ Funciones para paths ------------------
function getMigrationsPath(): string[] {
    return process.env.NODE_ENV === "production"
        ? [__dirname + '/migrations/*.js']
        : [__dirname + '/../src/migrations/*.ts'];
}

function getSubscribersPath(): string[] {
    return process.env.NODE_ENV === "production"
        ? [__dirname + '/subscribers/*.js']
        : [__dirname + '/../src/subscribers/*.ts'];
}

function getEntitiesPath(): string[] {
    return process.env.NODE_ENV === "production"
        ? [__dirname + '/../**/*.entity.js']
        : [__dirname + '/../**/*.entity.ts'];
}
