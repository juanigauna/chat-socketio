let router = require('express').Router()

router.get('/', (req, res) => {
    res.send("Word list")
})

router.put('/edit/:wordId', (req, res) => {
    res.send('word edited')
})

module.exports = router