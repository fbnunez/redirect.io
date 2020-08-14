const { Router } = require('express');
const router = Router();
const urlMaker = require('./helpers/urlMaker');
const urlSchema = require('./json_schema/UrlSchema');
const UrlKey = require('./models/UrlKey');
const mongoose = require('./database');

router.get('/api', (req, res) => {
  res.json({
    message: 'redirect.io is a url-shortener/redirect',
  });
});

router.get('/api/redirect/:id', async (req, res, next) => {
  try {
    const { id: alias } = req.params;
    const urlExists = await UrlKey.findOne({
      alias,
    });
    if (!urlExists) {
      throw new Error('Your redirect was not found. Maybe it has expired?');
    }
    res.json({
      message: alias,
      url: urlExists.url,
    });
  } catch (err) {
    next(err);
  }
});

// create redirect url
router.post('/api/url', async (req, res, next) => {
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
    const urlExists = await UrlKey.findOne({
      alias,
    });
    if (urlExists) {
      throw new Error(
        'Something went wrong... maybe your alias already exists'
      );
    }
    const urlKeyObj = new UrlKey({
      _id: new mongoose.Types.ObjectId(),
      alias: alias,
      url: url,
    });
    urlKeyObj.save();
    res.json({
      alias,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
