require("dotenv").config();
const express = require("express");
const path = require("path");
let app = express();

const routes = require("./controllers/routes");
const mongoose = require("mongoose");
const session = require("express-session");

// Set the views directory
app.set("views", path.join(__dirname, "/views"));

// Set the public directory
app.use(express.static(path.join(__dirname, "public")));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up the session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Set the view engine to ejs
app.set("view engine", "ejs");

// Call Mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB Connection Error:", error));

app.use(routes);

app.listen(process.env.PORT);
