module.exports = app => {
  const scrape = require('../controllers/scrape.controller.js')

  var router = require('express').Router()

  // Retrieve all Tutorials
  router.get('/', scrape.findAll)

  // Update favorite value of a scrape
  router.put('/flagged', scrape.updateFlagged)

  // Retrieve a single Scrape with id
  router.get('/:id', scrape.findOne);

  router.delete('/:id', scrape.delete)

  app.use('/api/v1', router)
}
