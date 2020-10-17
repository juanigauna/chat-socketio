let router = require('express').Router()

router.get('/', (req, res) => {
    con.query(
        'SELECT * FROM words',
        (err, rows) => {
            if (err) {
                res.render('index', {
                    path: 'errors/errors.ejs',
                    error: err 
                })
            } else {
                res.render('index', {
                    path: 'dashboard/index.ejs',
                    array: rows
                })
            }
        }
    )
})
router.get('/settings', (req, res) => {
    res.render('index', {
        path: 'dashboard/settings.ejs'
    })
})
module.exports = router