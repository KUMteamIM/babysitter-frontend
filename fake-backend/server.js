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

var server = app.listen(8000, '0.0.0.0', function () {
  console.log('Mock API server listening on port 8000!')
})
