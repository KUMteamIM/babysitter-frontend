var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var fs = require('fs')
var path = require('path')
var ws = require('ws')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const standardEndpoints = ['auth/login']

for (let index = 0; index < standardEndpoints.length; index++) {
  const ep = standardEndpoints[index]
  app.post('/api/v1/' + ep, function (req, res) {
    findFile(req, ep, res)
  })
}

function getWanteds(req) {
  const wantedIDs =
    req && req.body && req.body.objectIDs
      ? JSON.parse(req.body.objectIDs)
      : false

  return { wantedIDs }
}

function getWanted(req) {
  const ded1 = triad('body', req)
  return ded1
}

function triad(prm, req) {
  const wantedID = req && req[prm] && req[prm].objectID ? req[prm].objectID : ''
  const wantedType =
    req && req[prm] && req[prm].vceType ? req[prm].vceType.toString() : ''
  return { wantedID, wantedType }
}

function findFile(req, endpoint, res) {
  const folders = ['']
  let pathParts = []

  for (let index = 0; index < folders.length; index++) {
    const folderName = folders[index]
    const wanted = path.join(
      __dirname,
      './api/' +
        folderName +
        endpoint +
        '.json'
    )

    console.log(wanted)

    try {
      var contents = fs.readFileSync(wanted)
      res.send(JSON.parse(contents))
    } catch {
      if (index + 1 === folders.length) {
        const missingFile =
          folderName +
          endpoint +
          '.json'
        sendDefaultJsonResponse(req, res, 'missing file: ' + missingFile)
      }
    }
  }
}

function sendDefaultJsonResponse(rq, res, message) {
  let jsonRes = {
    status: 'ERROR',
    message: 'Not implemented',
  }
  if (message) jsonRes.message = message
  res.send(jsonRes)
}

function sendOkJsonResponse(rq, res) {
  let jsonRes = {
    status: 'SUCCESS',
    message: 'great job!',
  }
  res.send(jsonRes)
}

function sendRandomOkErrorJsonResponse(req, res) {
  const mr = Math.random()
  switch (true) {
    case mr < 0.3:
      res.status(500).send('Something broke!')
      let jsonRes = {
        status: 'ERROR',
        message: 'fail',
      }
      res.send(jsonRes)
      break
    case mr < 0.7:
      sendOkJsonResponse(req, res)
      break
    default:
      sendDefaultJsonResponse(req, res)
      break
  }
}

function attributeResponse(req, res) {
  res.set('Content-Type', 'application/json')
  const attributes =
    req && req.body && req.body.attributes ? req.body.attributes : []
  const wantedID =
    req && req.body && req.body.objectID ? req.body.objectID : 'not set'
  let jsonRes = {
    status: 'ERROR',
    message: 'Not implemented',
    attributes: JSON.stringify(attributes),
    objectID: wantedID,
  }
  res.send(jsonRes)
}

var server = app.listen(8000, '0.0.0.0', function () {
  console.log('Mock API server listening on port 8000!')
})
