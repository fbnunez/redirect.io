const { Router } = require('express');
const router = Router();
const urlMaker = require('./helpers/urlMaker');
const urlSchema = require('./json_schema/UrlSchema');
const UrlKey = require('./models/UrlKey');
const mongoose = require('./database');

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
    await urlSchema.validate({
      url,
      alias,
    });
    if (!alias || alias === '') {
      alias = await urlMaker.getNanoUrl();
    }
    const urlKeyObj = new UrlKey({
      _id: new mongoose.Types.ObjectId(),
      alias: alias,
      url: url,
    });
    urlKeyObj.save();
    res.json({
      message: {
        alias,
        url,
      },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
