"use strict";
import { DataTypes } from "sequelize";
import db from "../db/sequelize.js";
const User = db.define("user", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
    },
    verifiedEmail: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    passwd: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    updatedAt: false,
});
export default User;
