"use strict";
import express from "express";
import cors from "cors";
import cron from "node-cron";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import config from "./config.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import viewRoutes from "./routes/viewRoutes.js";
import db from "./db/sequelize.js";
import { rmUnverifiedUsers } from "./jobs/rmUnverifiedUsers.js";
const app = express();
app.set("view engine", "ejs");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "../src/views"));
app.use(express.static(path.join(__dirname, "../src/public")));
app.use(express.json());
app.use(cors(config.cors));
app.use(cookieParser());
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/", viewRoutes);
cron.schedule("0 0 * * *", () => {
    rmUnverifiedUsers();
});
db.sync()
    .then(() => {
    const PORT = config.env.PORT;
    app.listen(PORT, () => {
        console.log(`Running... :${PORT}`);
    });
})
    .catch((err) => console.error(err));
