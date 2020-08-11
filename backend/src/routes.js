const {Router} = require('express')
const router = Router()


router.get('/', (req, res) => {
    res.json({
        message: "redirect.io is a url-shortener/redirect"
    })
})


module.exports = router