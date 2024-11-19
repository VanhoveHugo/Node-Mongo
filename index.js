const express = require("express");
const path = require("path");
let app = express();

const routes = require("./controllers/routes");

// Set the views directory
app.set("views", path.join(__dirname, "/routes"));

// Set the view engine to ejs
app.set('view engine', 'ejs');

app.use(routes)

app.listen(3000);