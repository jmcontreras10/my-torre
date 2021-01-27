const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

//  Importing Routers
const authRoutes = require("./Auth/auth.routes");
const organizationsRoutes = require("./Organization/Organization.routes");
const socialRoutes = require("./Social/Social.routes");

const app = express();

//  Middleware
//  Cors middelware [ Done ]
//  Cors middelware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(logger("dev"));

//  Routes
app.use("/api/auth", authRoutes);
app.use("/api/organizations", organizationsRoutes);
app.use("/api/social", socialRoutes);

app.use(express.static(path.join(__dirname, "../../Front")));


app.get("/*", (req, res) => {
  res.sendFile(path.join(path.join(__dirname, "../../Front"), "index.html"));
});

module.exports = app;
