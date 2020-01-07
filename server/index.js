require('dotenv').config()

// Bringing in modules
const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive')
    , axios = require('axios')

const app = express()

app.use( express.static( `${__dirname}/../build` ) );

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
  db.get_products([req.body.region, req.body.atype]).then(response => {
    res.send(response)
  })
})

app.post('/api/searchProducts', (req, res) => {
  const db = app.get('db')
  db.search_products([req.body.region, req.body.atype, req.body.keyword]).then(response => {
    res.send(response)
  })
})

app.post('/api/getShortLink', (req, res) => {
  let encodedURL = `https://shop.truvisionhealth.com/${req.body.username}/Login?type=2&countrycode=${req.body.countryCode}&language=en-${req.body.countryCode}&products=${JSON.stringify(req.body.cart)}${req.body.subCheck === true ? "&isDiscount=true" : ""}`
  axios.post('https://truvis.io/api/createLink', {link: encodedURL})
    .then(response => {
      let shorturl = response.data[0].shorturl
      res.send({url: `truvis.io/${shorturl}`})
    })
})

app.get('/api/getProductsFromIDs', (req, res) => {
  const db = app.get('db')
  db.get_products_from_ids()
    .then(response => {
      res.send(response)
    })
})

app.post('/api/importLink', (req, res) => {
  axios.post('https://truvis.io/api/importLink', {shorturl: shorturl})
})

const path = require('path')
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

const PORT = 3535
app.listen(PORT, console.log(`Listening on port ${PORT}`))