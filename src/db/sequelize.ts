"use strict";

import { Sequelize } from "sequelize";

const db = new Sequelize({
  dialect: "sqlite",
  storage: "./.data/database.db",
  logging: false,
});

export default db;
