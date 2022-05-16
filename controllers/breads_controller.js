const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const seedData = require('../models/seed.js')

// INDEX
breads.get('/', (req, res) => {
  Bread.find()
    .then(foundBreads => {
      res.render('Index',
        {
          breads: foundBreads,
          title: 'Index Page'
        })
    })

  // )
  //res.send(Bread)
})

// NEW
breads.get('/new', (req, res) => {
  res.render('new')
})

// EDIT
breads.get('/:indexArray/edit', (req, res) => {
  // res.render('edit', {
  //   bread: Bread[req.params.indexArray],
  //   index: req.params.indexArray
  // })

  Bread.findById(req.params.indexArray)
    .then(foundBread => {
      console.log('edit route', foundBread)
      res.render('edit', {
        bread: foundBread
      })
    })
})


// SHOW INDIVIUAL 
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
    .then(foundBread => {
      const bakedBy = foundBread.getBakedBy()
      console.log(bakedBy)
      res.render('show', {
        bread: foundBread
      })
    })
    .catch(err => {
      res.send('404')
    })


  // // res.send(Bread[req.params.arrayIndex])
  // if (Bread[req.params.arrayIndex]) {
  //   res.render('Show', {
  //     bread: Bread[req.params.arrayIndex],
  //     index: req.params.arrayIndex
  //   })
  // } else {
  //   // res.send('404')
  //   res.render('404')
  // }

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
// breads.delete('/:indexArray', (req, res) => {
//   Bread.splice(req.params.indexArray, 1)
//   res.status(303).redirect('/breads')
// })

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
  // Bread[req.params.arrayIndex] = req.body
  // res.redirect(`/breads/${req.params.arrayIndex}`)
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

