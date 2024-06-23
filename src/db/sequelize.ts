"use strict";

import { Sequelize } from "sequelize";

const db = new Sequelize({
  dialect: "sqlite",
  storage: "./.data/database.db",
  logging: false,
});

db.authenticate().catch((err) => {
  console.error(err);
});

export default db;
