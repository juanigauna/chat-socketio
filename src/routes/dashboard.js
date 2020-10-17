let router = require('express').Router()

router.get('/', (req, res) => {
    res.render('index', {
        path: 'dashboard/index.ejs',
    })
})
router.get('/settings', (req, res) => {
    res.render('index', {
        path: 'dashboard/settings.ejs'
    })
})
module.exports = router