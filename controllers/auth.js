const router = require("express").Router();
const User = require("../models/user.models");
const bcrypt = require("bcrypt");

/*
 * @route GET /login
 */
router.get("/login", (req, res) => {
  res.render("login");
});

/*
 * @route POST /login
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check required fields
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  // Find if the user exists
  const user = await User.findOne({ email });

  // If the user does not exist, return an error
  if (!user) {
    return res.status(400).json({ message: "Email not found" });
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);

  // If the passwords do not match, return an error
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Set the session
  req.session.user = user;

  // Redirect to the home page
  res.redirect("/");
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

  // Check required fields
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  // Check password length
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters" });
  }

  // Check password complexity
  if (
    !password.match(
      /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    )
  ) {
    return res.status(400).json({
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    });
  }

  // Hash password
  const hash = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({
    pseudo,
    email,
    password: hash,
  });

  // Save user
  await newUser.save();

  // Redirect to login
  res.redirect("/login");
});

module.exports = router;
