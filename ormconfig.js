const path = require("path");

module.exports = {
  type: "postgres",
  url: process.env.DB_URL || "postgres://postgres@localhost:5432/dev",
  synchronize: true,
  logging: false,
  entities: [
    path.resolve(__dirname, "packages/server/src/entity/**/*{.js,.ts}"),
  ],
  migrations: [
    path.resolve(__dirname, "packages/server/src/migration/**/*{.js,.ts}"),
  ],
  subscribers: [
    path.resolve(__dirname, "packages/server/src/subscriber/**/*{.js,.ts}"),
  ],
};
