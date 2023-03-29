const router = require('express').Router();

router.get('/', (req, res) => {
  const cats = ['Rosey', 'Puma', 'Mr.buttons', 'Aya'];
  res.json(cats);
});

module.exports = router;