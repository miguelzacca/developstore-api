"use strict";

import { UUID, UUIDV4, STRING, BOOLEAN } from "sequelize";
import db from "../db/sequelize.js";

const User = db.define(
  "User",
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },

    name: {
      type: STRING(100),
      allowNull: false,
    },

    email: {
      type: STRING(100),
      unique: true,
      allowNull: false,
    },

    verifiedEmail: {
      type: BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },

    passwd: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    updatedAt: false,
  }
);

export default User;
