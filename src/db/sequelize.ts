"use strict";

import { Sequelize } from "sequelize";

const db = new Sequelize({
  dialect: "sqlite",
  storage: "./src/db/database.db",
  logging: false,
});

export default db;
