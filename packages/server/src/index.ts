import "reflect-metadata";
import { start } from "./server";
import { createConnection } from "typeorm";

async function main() {
  await createConnection();
  await start();
}

main().catch((e) => console.log(e));
