if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
var mockScrapes = require('./mock_scrapes')

const app = express()

app.use(express.static(path.join(__dirname, 'client', 'build')));

const db = require('./app/models')
// db.sequelize.sync({ force: true }).then(() => {
//   return mockScrapes.forEach(mockScrape => {
//     db.scrape
//       .create(mockScrape)
//       .then(mockScrape =>
//         console.log(`Scrapes auto-generated id: ${mockScrape.id}`)
//       )
//   })
// })

// var corsOptions = {
//   origin: 'localhost:3000'
// }

app.use(cors())
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   )
//   next()
// })

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Web scraper API v1.1' })
})

require('./app/routes/scrape.routes')(app)

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
