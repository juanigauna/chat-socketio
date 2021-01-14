let router = require('express').Router()

router.get('/', (req, res) => {
    res.render('index', { path: 'home/index.ejs' })
})
router.get('/settings', (req, res) => {
    res.render('index', { path: 'home/settings.ejs' })
})

module.exports = router