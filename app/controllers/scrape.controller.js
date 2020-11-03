const db = require('../models')
const Scrape = db.scrape
const Op = db.Sequelize.Op
const queryInterface = db.sequelize.getQueryInterface()

exports.findAll = (req, res) => {
  Scrape.findAll({
    attributes: [
      'id',
      'datefound',
      'url',
      'screenshot',
      'textfound',
      'hits',
      'score',
      'flagged'
    ]
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving scraped data.'
      })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id
  Scrape.findByPk(id)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while retrieving scrape with id: ' +
            id.toString()
      })
    })
}

exports.update = (req, res) => {}

exports.delete = (req, res) => {
  const id = req.params.id

  Scrape.destroy({ where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Scrape was deleted successfully!'
        })
      } else {
        res.send({
          message: `Cannot delete Scrape with id=${id}. Maybe Scrape was not found!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete Scrape with id=' + id
      })
    })
}

exports.updateFlagged = (req, res) => {
  const id = req.query.id
  const value = req.query.flagged

  Scrape.update({ flagged: value }, { where: { id: id } })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Flagged was updated successfully.'
        })
      } else {
        res.send({
          message: `Cannot update Scrape with id=${id}. Maybe Scrape was not found or req.body is empty!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating Scrape with id=' + id
      })
    })
}
