const router = require("express").Router();
const User = require("../models/user.models");

/*
  * @route GET /login
  */
router.get("/login", (req, res) => {
  res.render("login");
});

/*
  * @route POST /login
  */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // TODO: check all fields

  // TODO: check if user exists in the database with the email

  // TODO: return if user does not exist

  // TODO: check if the password is matching

  // TODO: return if the email or password is invalid

  // TODO: create a session

  res.redirect("/")
});


/*
  * @route GET /register
  */
router.get("/register", (req, res) => {
  res.render("register");
});

/*
  * @route POST /register
  */
router.post("/register", async (req, res) => {
  const { pseudo, email, password } = req.body;

  // TODO: check all fields

  // TODO: return if one field is missing / invalid

  // TODO: hash password before saving it to the database

  const newUser = new User({
    pseudo,
    email,
    password,
  });

  await newUser.save();

  res.json(newUser);
});

module.exports = router;
