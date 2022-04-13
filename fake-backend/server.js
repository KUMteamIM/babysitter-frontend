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
app.use(express.static(__dirname + '/files', { index: false, extensions: ['json']}));

app.post("/api/v1/auth/login.json", function(req, res) {
  var contents = fs.readFileSync(__dirname + '/files/api/v1/auth/login.json')
  res.send(JSON.parse(contents))
})

var server = app.listen(8000, '0.0.0.0', function () {
  console.log('Mock API server listening on port 8000!')
})
