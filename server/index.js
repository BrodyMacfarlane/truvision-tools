require('dotenv').config()

// Bringing in modules
const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive')
    , axios = require('axios')
    , querystring = require('querystring')
    , fs = require('fs')

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
  let encodedURL = `https://secure.truvisionhealth.com/#/${req.body.username}/Application?${req.body.aType === 1 ? "cpn=tvt&" : ""}type=${req.body.aType}&countrycode=${req.body.countryCode}&language=en-us&products=${JSON.stringify(req.body.cart)}`
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








// APP LOGIN

const username = process.env.EXAVAULT_USER
const password = process.env.EXAVAULT_PASS

const path = "%2FApp%20Login"
const baseDir = "/var/www/applogin.truvisiontools.com"

// Establishing headers for the multiple Exavault API requests
axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded"
axios.defaults.headers.post['api_key'] = process.env.EXAVAULT_API_KEY

// Converting credentials to Exavault's required format
const credentials = querystring.stringify({
  "username": username,
  "password": password
});




function deleteFiles(){
  return new Promise((resolve, reject) => {
    fs.readdir(baseDir, (err, files) => {
      if(files.length > 0){
        for(let i = 0; i < files.length; i++){
          fs.unlink(`${baseDir}/${files[i]}`, () => {
            if(i + 1 === files.length){
              resolve()
            }
          })
        }
      }
      else {
        resolve()
      }
    })
  })
}

async function getExavault(){
  axios.post('https://api.exavault.com/v1.2/authenticateUser', credentials)
    .then(response => {
      const accessToken = response.data.results.accessToken;
      const getFilesUrl = `https://api.exavault.com/v1.2/getResourceList?access_token=${accessToken}&path=${path}&sortBy=sort_files_date&sortOrder=desc`
      axios.get(getFilesUrl)
        .then(response => {
          const resources = response.data.results.resources
          for(let i = 0; i < resources.length; i++){
            let fileUrl = resources[i].path
            let resource = resources[i]
            const getDownloadFileUrl = `https://api.exavault.com/v1.2/getDownloadFileUrl?access_token=${accessToken}&filePaths=${fileUrl}`
            axios.get(getDownloadFileUrl)
              .then(response => {
                const downloadLink = response.data.results.url
                axios.get(downloadLink, {responseType: "blob"})
                  .then(response => {
                    fs.writeFile(`${baseDir}/${resource.name}`, response.data, function(err){
                    })
                  })
              })
          }
        })
    })
}

app.get('/api/refreshExavault', (req, res) => {
  deleteFiles().then(() => {
    getExavault()
  })
})









const path = require('path')
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

const PORT = 3535
app.listen(PORT, console.log(`Listening on port ${PORT}`))