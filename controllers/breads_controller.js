const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const seedData = require('../models/seed.js')
const Baker = require('../models/baker.js')


// INDEX
//Async
breads.get('/', async (req, res) => {
  //lean method to lessen memory consumption
  const foundBakers = await Baker.find().lean()
  const foundBreads = await Bread.find().populate('baker').limit(2)
  res.render('Index', {
    breads: foundBreads,
    bakers: foundBakers,
    title: 'Index Page'
  })
})
//Promises
// breads.get('/', (req, res) => {
//   Baker.find()
//     .then(foundBakers => {
//       Bread.find()
//         .populate('baker')
//         .then(foundBreads => {
//           res.render('Index',
//             {
//               breads: foundBreads,
//               bakers: foundBakers,
//               title: 'Index Page'
//             })
//         })
//     })

// })

// NEW
breads.get('/new', (req, res) => {
  Baker.find()
    .then(foundBakers => {
      res.render('new', {
        bakers: foundBakers
      })
    })
})

// EDIT
breads.get('/:indexArray/edit', (req, res) => {
  Baker.find()
    .then(foundBakers => {
      Bread.findById(req.params.indexArray)
        .then(foundBread => {
          console.log('edit route', foundBread)
          res.render('edit', {
            bread: foundBread,
            bakers: foundBakers
          })
        })
    })
})


// SHOW INDIVIUAL 
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
    .populate('baker')
    .then(foundBread => {
      res.render('show', {
        bread: foundBread
      })
    })
    .catch(err => {
      res.send('404')
    })
})

// CREATE
breads.post('/', (req, res) => {

  if (!req.body.image) {
    req.body.image = 'https://images.unsplash.com/photo-1567042661848-7161ce446f85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YnJlYWR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
  }
  if (req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }

  Bread.create(req.body)
    .catch(err => {
      console.log('error caught')
      res.render('404')
    })
  res.status(303).redirect('/breads')
})

// DELETE
breads.delete('/:id', (req, res) => {
  Bread.findByIdAndDelete(req.params.id)
    .then(deletedBread => {
      res.status(303).redirect('/breads')
    })
})

// UPDATE
breads.put('/:arrayIndex', (req, res) => {
  if (req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.arrayIndex, req.body, { new: true })
    .then(updatedBread => {
      console.log(updatedBread)
      res.redirect(`/breads/${req.params.arrayIndex}`)
    })
})

//SEED DATA ROUTE
breads.get('/data/seed', (req, res) => {
  Bread.insertMany(seedData)
    .then(createdBreads => {
      res.redirect('/breads')
    })
})

module.exports = breads

