const router = require('express').Router();

router.get("/", async (req, res) => {
  res.render("index");
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/services', (req, res) => {
  res.render('services');
});

module.exports = router;