import "reflect-metadata";
import path from "path";
import { start } from "./server";
import { createConnection } from "typeorm";

const DB_URL = process.env.DB_URL || "postgres://postgres@localhost:5432/dev";

async function main() {
  await createConnection({
    type: "postgres",
    url: DB_URL,
    synchronize: true,
    logging: false,
    entities: [path.resolve(__dirname, "entity/**/*{.js,.ts}")],
    migrations: [path.resolve(__dirname, "migration/**/*{.js,.ts}")],
    subscribers: [path.resolve(__dirname, "subscriber/**/*{.js,.ts}")],
  });
  await start();
}

main().catch((e) => console.log(e));
