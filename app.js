// const express = require("express");
import mongoose from "mongoose";
import express from "express";
import HelloRoutes from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import UserRoutes from "./users/routes.js";
import LikesRoutes from "./likes/routes.js";
import FollowsRoutes from "./follows/routes.js";
import session from "express-session";

import cors from "cors";

mongoose.connect("mongodb://127.0.0.1:27017/kanbas-cs4550-01-fa23");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
app.use(session(sessionOptions));

app.use(express.json());

FollowsRoutes(app);
LikesRoutes(app);
UserRoutes(app);
Lab5(app);
ModuleRoutes(app);
CourseRoutes(app);
HelloRoutes(app);
app.listen(4000);
