require('dotenv').config()

// Bringing in modules
const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive')
    , axios = require('axios')

const app = express()

app.use(bodyParser.json())
app.use(cors())

// Establish connection to database
massive(process.env.CONNECTION_STRING).then((db) => {
  app.set('db', db)
})

app.get('/api/getCountries', (req, res) => {
  const db = app.get('db')
  db.get_countries().then(response => {
    res.send(response)
  })
})

app.post('/api/getProducts', (req, res) => {
  const db = app.get('db')
  db.get_products([req.body.store, req.body.region, req.body.atype]).then(response => {
    res.send(response)
  })
})

app.post('/api/getShortLink', (req, res) => {
  let encodedURL = encodeURIComponent(`https://secure.truvisionhealth.com/#/${req.body.username}/Application?type=${req.body.aType}&countrycode=${req.body.countryCode}&language=en-us&products=${JSON.stringify(req.body.cart)}`)
  axios.get(`https://api-ssl.bitly.com/v3/shorten?access_token=${process.env.BITLY_ACCESS_TOKEN}&longUrl=${encodedURL}`)
    .then(response => {
      res.send(response.data)
    })
})

const PORT = 3535
app.listen(PORT, console.log(`Listening on port ${PORT}`))