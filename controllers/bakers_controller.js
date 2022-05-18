// dependencies
const express = require('express')
const baker = express.Router()
const Baker = require('../models/baker.js')



baker.get('/data/seed', (req, res) => {
    Baker.insertMany(bakerSeedData)
        .then(res.redirect('/breads'))
})


// export
module.exports = baker                    
