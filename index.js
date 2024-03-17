import { configDotenv } from "dotenv";
import express from "express";

import { App } from "./src/app.js";

configDotenv({ path: "./config/.env" });
App(express);
