import "reflect-metadata";
import { createConnection } from "typeorm";
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
import { router } from "./routes/v1";
import { CONFIG } from "./config";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);

app.listen(CONFIG.PORT);

createConnection();
