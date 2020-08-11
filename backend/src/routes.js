const { Router } = require('express');
const router = Router();
const urlMaker = require('./helpers/urlMaker');
const urlModel = require('./models/url');

router.get('/', (req, res) => {
  res.json({
    message: 'redirect.io is a url-shortener/redirect',
  });
});

router.get('/:id', async (req, res, next) => {
  res.json({
    message: 'alias',
  });
});

router.post('/url', async (req, res, next) => {
  const { url } = req.body;
  let { alias } = req.body;
  try {
    const isValid = await urlModel.validate({
      url,
      alias,
    });
    if (!alias || alias === '') {
      alias = await urlMaker.getNanoUrl();
    }
    res.json({
      message: alias,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
